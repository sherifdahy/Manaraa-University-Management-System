using App.Application.Abstractions;
using App.Application.Commands.Authentications;
using App.Application.Commands.Roles;
using App.Application.Errors;
using App.Application.Responses.Authentications;
using App.Application.Responses.Role;
using App.Core.Entities.Identity;
using App.Core.Interfaces;
using App.Services;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;

namespace App.Application.Handlers.Commands.Authentications;

public class LoginCommandHandler(UserManager<ApplicationUser> userManager
    ,SignInManager<ApplicationUser> signInManager
    ,IJwtProvider jwtProvider,
    IAuthService authService) : IRequestHandler<LoginCommand, Result<AuthenticationResponse>>
{
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly SignInManager<ApplicationUser> _signInManager = signInManager;
    private readonly IJwtProvider _jwtProvider = jwtProvider;
    private readonly IAuthService _authService = authService;

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

            #region TODO
            //TODO
            //var (userRoles, userPermissions) = await GetUserRolesAndPermissions(user, cancellationToken);
            //var (token, expiresIn) = _jwtProvider.GenerateToken(user, userRoles, userPermissions); 
            #endregion

            var (token, expiresIn) = _jwtProvider.GenerateToken(user);

            var (refreshToken, refreshTokenExpiration) = _authService.AddRefreshToken(user);

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
