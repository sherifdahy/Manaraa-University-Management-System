using App.Application.Commands.Authentications;
using App.Core.Extensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace App.API.Controllers.Authentications;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationsController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpPost(LoginCommand.Route)]

    public async Task<IActionResult> Login(LoginCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request,cancellationToken);
        return result.IsSuccess ? Ok(result.Value) : result.ToProblem();
    }

    [HttpPost(RegisterCommand.Route)]
    public async Task<IActionResult> Register(RegisterCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return result.IsSuccess ? Ok(result.Value) : result.ToProblem();
    }
}
