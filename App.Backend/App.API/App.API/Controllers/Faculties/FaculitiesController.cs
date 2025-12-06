using App.Application.Commands.Faculties;
using App.Application.Commands.Universities;
using App.Application.Queries.Faculties;
using App.Core.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace App.API.Controllers.Faculties;

[Route("api/[controller]")]
[ApiController]
public class FaculitiesController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> GetAll(bool includeDisabled = false,CancellationToken cancellationToken= default)
    {
        var query = new GetAllFacultiesQuery(includeDisabled);
        var result = await _mediator.Send(query, cancellationToken);
        return result.IsSuccess ? Ok(result.Value) : result.ToProblem();
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken = default)
    {
        var query = new GetFacultyQuery(id);
        var result = await _mediator.Send(query, cancellationToken);
        return result.IsSuccess ? Ok(result.Value) : result.ToProblem();
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateFacultyCommand command, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(command, cancellationToken);
        return result.IsSuccess ? CreatedAtAction(nameof(GetById), new { id = result.Value.Id }, result.Value) : result.ToProblem();
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateFacultyCommand command, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(command, cancellationToken);
        return result.IsSuccess ? NoContent() : result.ToProblem();
    }

    [HttpDelete("{id}/toggle-status")]
    public async Task<IActionResult> ToggleStatus(int id, CancellationToken cancellationToken = default)
    {
        var command = new ToggleStatusFacultyCommand(id);
        var result = await _mediator.Send(command, cancellationToken);
        return result.IsSuccess ? NoContent() : result.ToProblem();
    }
}
