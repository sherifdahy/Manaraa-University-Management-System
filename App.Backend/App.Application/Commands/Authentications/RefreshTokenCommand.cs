namespace App.Application.Commands.Authentications;

public record RefreshTokenCommand : IRequest<Result<AuthenticationResponse>>
{
    public string Token { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}
