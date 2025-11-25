using App.Application.Commands.Authentications;
using App.Application.Responses.Authentications;
namespace App.Application.Handlers.Commands.Authentications;

public class RefreshCommandHandler : IRequestHandler<RefreshTokenCommand, Result<AuthenticationResponse>>
{
    public Task<Result<AuthenticationResponse>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
