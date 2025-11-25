using App.Application.Abstractions;
using App.Application.Commands.Authentications;
using App.Application.Errors;
using App.Application.Responses.Authentications;
using App.Core.Entities.Identity;
using App.Core.Interfaces;
using App.Services;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace App.Application.Handlers.Commands.Authentications;

public class RegisterCommandHandler(UserManager<ApplicationUser> userManager,
    IJwtProvider jwtProvider
    ,IAuthService authService) : IRequestHandler<RegisterCommand, Result<AuthenticationResponse>>
{
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly IJwtProvider _jwtProvider = jwtProvider;
    private readonly IAuthService _authService = authService;
    public async Task<Result<AuthenticationResponse>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var emailIsExists = await _userManager.Users.AnyAsync(x => x.Email == request.Email, cancellationToken);

        if (emailIsExists)
            return Result.Failure<AuthenticationResponse>(AuthenticationErrors.DuplicatedEmail);

        var user = request.Adapt<ApplicationUser>();

        user.UserName = "omarzaky";

        var result = await _userManager.CreateAsync(user, request.Password);

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

        var error = result.Errors.First();

        return Result.Failure<AuthenticationResponse>(new Error(error.Code, error.Description, StatusCodes.Status400BadRequest));
    }
}
