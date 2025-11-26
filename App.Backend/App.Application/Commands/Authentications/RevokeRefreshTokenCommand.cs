namespace App.Application.Commands.Authentications;

public class RevokeRefreshTokenCommand : IRequest<Result>
{
    public string Token { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}
