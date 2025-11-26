using App.Application.Authentication.Filters;
using App.Application.Commands.Roles;
using App.Application.Queries.Roles;
using App.Core.Extensions;
using App.Infrastructure.Abstractions.Consts;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace App.API.Controllers.Roles;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class RolesController(IMediator _mediator) : ControllerBase
{

    [HttpGet(GetAllRolesCommand.Route)]
    [HasPermission(Permissions.GetRoles)]
    public async Task<IActionResult> GetAllRoles([FromQuery] bool includeDisabled,CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetAllRolesCommand(includeDisabled), cancellationToken);
        return result.IsSuccess ? Ok(result.Value) : result.ToProblem();
    }

    [HttpGet(GetRoleByIdCommand.Route)]
    [HasPermission(Permissions.GetRoles)]
    public async Task<IActionResult> GetById([FromRoute]int id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetRoleByIdCommand(id), cancellationToken);
        return result.IsSuccess ? Ok(result.Value) : result.ToProblem();
    }

    [HttpPost(CreateRoleCommand.Route)]
    //[HasPermission(Permissions.CreateRoles)]
    public async Task<IActionResult> Create([FromBody] CreateRoleCommand command ,CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(command, cancellationToken);
        return result.IsSuccess ? CreatedAtAction(nameof(GetById), new { id = result.Value.Id }, result.Value) : result.ToProblem(); 
    }

    [HttpPut(UpdateRoleCommand.Route)]
    [HasPermission(Permissions.UpdateRoles)]
    public async Task<IActionResult> Update([FromBody] UpdateRoleCommand command, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(command, cancellationToken);
        return result.IsSuccess ? NoContent() : result.ToProblem();
    }

    [HttpDelete(ToggleStatusRoleCommand.Route)]
    [HasPermission(Permissions.ToggleStatusRoles)]
    public async Task<IActionResult> ToggleStatus(int id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new ToggleStatusRoleCommand(id), cancellationToken);
        return result.IsSuccess ? NoContent() : result.ToProblem();
    }

}
