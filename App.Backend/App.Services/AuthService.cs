using App.Core.Entities.Identity;
using System.Security.Cryptography;
using App.Core.Interfaces;
namespace App.Services;

public class AuthService : IAuthService
{
    private readonly int _refreshTokenExpirationDays = 14;


    public  (string refreshToken,DateTime refreshTokenExpiration) AddRefreshToken(ApplicationUser user)
    {
        var refreshToken = GenerateRefreshToken();

        var refreshTokenExpiration = GetRefreshTokenExpiration();

        user.RefreshTokens.Add(
            new RefreshToken
            {
                Token = refreshToken,
                ExpireOn = refreshTokenExpiration
            }
            );

        return (refreshToken,refreshTokenExpiration);
    }
    private static string GenerateRefreshToken()
    {
        return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
    }
    private DateTime GetRefreshTokenExpiration()
    {
        return DateTime.UtcNow.AddDays(_refreshTokenExpirationDays);
    }
}
