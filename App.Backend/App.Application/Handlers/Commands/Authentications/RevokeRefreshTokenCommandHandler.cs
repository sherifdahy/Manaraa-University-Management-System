using App.Core.Entities.Identity;

namespace App.Application.Handlers.Commands.Authentications;

public class RevokeRefreshTokenCommandHandler(IJwtProvider jwtProvider
    ,UserManager<ApplicationUser> userManager
    ,IAuthenticationService authenticationService) : IRequestHandler<RevokeRefreshTokenCommand, Result>
{
    private readonly IJwtProvider _jwtProvider = jwtProvider;
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly IAuthenticationService _authenticationService = authenticationService;

    public async Task<Result> Handle(RevokeRefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var userId = _jwtProvider.ValidateToken(request.Token);

        if (userId is null)
            return Result.Failure(AuthenticationErrors.InvalidToken);

        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
            return Result.Failure(AuthenticationErrors.InvalidToken);

        var userRefreshToken = user.RefreshTokens.SingleOrDefault(x => x.Token == request.RefreshToken && x.IsActive);

        if (userRefreshToken is null)
            return Result.Failure(AuthenticationErrors.InvalidToken);

        userRefreshToken.RevokedOn = DateTime.UtcNow;

        await _userManager.UpdateAsync(user);

        return Result.Success();
    }
}
