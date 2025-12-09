
namespace App.Application.Commands.Authentications;

public record ForgetPasswordCommand : IRequest<Result>
{
    public string Email { get; set; } = string.Empty;
}
