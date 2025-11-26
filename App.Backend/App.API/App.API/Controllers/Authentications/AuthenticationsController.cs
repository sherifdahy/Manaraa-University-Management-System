using App.Application.Commands.Authentications;
using App.Core.Extensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace App.API.Controllers.Authentications;

[Route("[controller]")]
[ApiController]
public class AuthenticationsController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpPost("login")]

    public async Task<IActionResult> Login(LoginCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request,cancellationToken);
        return result.IsSuccess ? Ok(result.Value) : result.ToProblem();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return result.IsSuccess ? Ok(result.Value) : result.ToProblem();
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return result.IsSuccess ? Ok(result.Value) : result.ToProblem();
    }

    [HttpPost("revoke-refresh-token")]
    public async Task<IActionResult> RevokeRefreshToken(RevokeRefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return result.IsSuccess ? Ok() : result.ToProblem();
    }
}
