using App.Application.Abstractions;
using Microsoft.AspNetCore.Http;

namespace App.Application.Errors;

public static class AuthenticationErrors
{
    public static readonly Error InvalidCredentials = 
        new Error("User.InvalidCredentials", "Invalid UserName Or Password", StatusCodes.Status401Unauthorized);

    public static readonly Error DisabledUser = 
        new Error("User.DisabledUser", "Disabled User please contact your admin", StatusCodes.Status400BadRequest);

    public static readonly Error EmailNotConfirmed = 
        new Error("User.EmailNotConfirmed", "Email Not Confirmed", StatusCodes.Status401Unauthorized);

    public static readonly Error LockedUser = 
        new Error("User.LockedUser", "Locked User please contact your admin", StatusCodes.Status400BadRequest);

    public static readonly Error DuplicatedEmail = 
        new Error("User.DuplicatedEmail", "Duplicated Email", StatusCodes.Status400BadRequest);

    public static readonly Error InvalidToken = 
        new Error("User.InvalidToken", "Invalid Token", StatusCodes.Status401Unauthorized);



}
