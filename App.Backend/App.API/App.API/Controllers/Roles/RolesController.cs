using App.Application.Queries.RoleCommands;
using App.Core.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace App.API.Controllers.Roles;

[Route("api/[controller]")]
[ApiController]
public class RolesController(IMediator _mediator) : ControllerBase
{

    [HttpGet]
    // permissions
    public async Task<IActionResult> GetAllRoles(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetAllRolesCommand(), cancellationToken);
        return result.IsSuccess ? Ok(result) : result.ToProblem();
    }

    [HttpGet(GetRoleByIdCommand.Route)]
    // permissions
    public async Task<IActionResult> GetById([FromRoute]int id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetRoleByIdCommand(id), cancellationToken);
        return result.IsSuccess ? Ok(result) : result.ToProblem();
    }
}
