using System.Security.Cryptography;

namespace App.Application.Handlers.Commands.Authentications;

public class LoginCommandHandler(UserManager<ApplicationUser> userManager
    ,SignInManager<ApplicationUser> signInManager
    ,IJwtProvider jwtProvider,
    IAuthenticationService authenticationService) : IRequestHandler<LoginCommand, Result<AuthenticationResponse>>
{
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly SignInManager<ApplicationUser> _signInManager = signInManager;
    private readonly IJwtProvider _jwtProvider = jwtProvider;
    private readonly IAuthenticationService _authenticationService = authenticationService;

    public async Task<Result<AuthenticationResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is null)
            return Result.Failure<AuthenticationResponse>(AuthenticationErrors.InvalidCredentials);

        if (user.IsDisabled)
            return Result.Failure<AuthenticationResponse>(AuthenticationErrors.DisabledUser);

        var result = await _signInManager.PasswordSignInAsync(user, request.Password, false, true);

        if (result.Succeeded)
        {

            var (userRoles, userPermissions) = await _authenticationService.GetUserRolesAndPermissions(user, cancellationToken);

            var (token, expiresIn) = _jwtProvider.GenerateToken(user, userRoles, userPermissions);

            var (refreshToken, refreshTokenExpiration) = _authenticationService.AddRefreshToken(user);

            await _userManager.UpdateAsync(user);

            var response = new AuthenticationResponse(user.Id, user.Email, user.FirstName, user.LastName
                , token, expiresIn, refreshToken, refreshTokenExpiration);

            return Result.Success<AuthenticationResponse>(response);
        }

        var error = result.IsNotAllowed
            ? AuthenticationErrors.EmailNotConfirmed
            : result.IsLockedOut
            ? AuthenticationErrors.LockedUser
            : AuthenticationErrors.InvalidCredentials;

        return Result.Failure<AuthenticationResponse>(error);
    }
    private static string GenerateRefreshToken()
    {
        return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
    }
}
