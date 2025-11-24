using App.Application.Filters;
using App.Application.Queries.Roles;
using App.Core.Extensions;
using App.Infrastructure.Abstractions.Consts;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace App.API.Controllers.Roles;

[Route("api/[controller]")]
[ApiController]
public class RolesController(IMediator _mediator) : ControllerBase
{

    [HttpGet]
    //[HasPermission(Permissions.GetRoles)]
    public async Task<IActionResult> GetAllRoles(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetAllRolesCommand(), cancellationToken);
        return result.IsSuccess ? Ok(result.Value) : result.ToProblem();
    }

    [HttpGet(GetRoleByIdCommand.Route)]
    //[HasPermission(Permissions.GetRoles)]
    public async Task<IActionResult> GetById([FromRoute]int id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetRoleByIdCommand(id), cancellationToken);
        return result.IsSuccess ? Ok(result.Value) : result.ToProblem();
    }
}
