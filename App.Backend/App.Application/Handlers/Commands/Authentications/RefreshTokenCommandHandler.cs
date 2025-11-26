namespace App.Application.Handlers.Commands.Authentications;

public class RefreshTokenCommandHandler(IJwtProvider jwtProvider
    ,UserManager<ApplicationUser> userManager
    ,IAuthenticationService authenticationService) : IRequestHandler<RefreshTokenCommand, Result<AuthenticationResponse>>
{
    private readonly IJwtProvider _jwtProvider = jwtProvider;
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly IAuthenticationService _authenticationService = authenticationService;

    public async Task<Result<AuthenticationResponse>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var userId = _jwtProvider.ValidateToken(request.Token);

        if (userId is null)
            return Result.Failure<AuthenticationResponse>(AuthenticationErrors.InvalidToken);

        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
            return Result.Failure<AuthenticationResponse>(AuthenticationErrors.InvalidToken);

        if (user.IsDisabled)
            return Result.Failure<AuthenticationResponse>(AuthenticationErrors.DisabledUser);

        if (user.LockoutEnd > DateTime.UtcNow)
            return Result.Failure<AuthenticationResponse>(AuthenticationErrors.LockedUser);

        var userRefreshToken = user.RefreshTokens.SingleOrDefault(x => x.Token == request.RefreshToken && x.IsActive);

        if (userRefreshToken is null)
            return Result.Failure<AuthenticationResponse>(AuthenticationErrors.InvalidToken);

        userRefreshToken.RevokedOn = DateTime.UtcNow;

        var (userRoles, userPermissions) = await _authenticationService.GetUserRolesAndPermissions(user, cancellationToken);

        var (newToken, newExpiresIn) = _jwtProvider.GenerateToken(user, userRoles, userPermissions);

        var (refreshToken, refreshTokenExpiration) = _authenticationService.AddRefreshToken(user);

        await _userManager.UpdateAsync(user);

        var response = new AuthenticationResponse(user.Id, user.Email, user.FirstName, user.LastName
            , newToken, newExpiresIn, refreshToken, refreshTokenExpiration);

        return Result.Success<AuthenticationResponse>(response);

    }
}
