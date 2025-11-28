
namespace App.Application.Commands.Authentications;

public class ForgetPasswordCommand : IRequest<Result>
{
    public string Email { get; set; } = string.Empty;
}
