using App.Application.Abstractions;
using App.Application.Commands.Roles;
using App.Application.Errors;
using App.Application.Responses.Role;
using App.Core.Entities.Identity;
using App.Infrastructure.Abstractions.Consts;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace App.Application.Handlers.Commands.Roles;

public class CreateRoleCommandHandler(RoleManager<ApplicationRole> roleManager) : IRequestHandler<CreateRoleCommand, Result<RoleDetailResponse>>
{
    private readonly RoleManager<ApplicationRole> _roleManager = roleManager;

    public async Task<Result<RoleDetailResponse>> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
    {
        var existRole = await _roleManager.FindByNameAsync(request.Name);

        if (existRole is not null)
            return Result.Failure<RoleDetailResponse>(RoleErrors.Duplicated);

        var allawedPermissions = Permissions.GetAllPermissions();

        if (request.Permissions.Except(allawedPermissions).Any())
            return Result.Failure<RoleDetailResponse>(RoleErrors.InvalidPermissions);

        var newRole = new ApplicationRole()
        {
            Name = request.Name,
            ConcurrencyStamp = Guid.NewGuid().ToString(),
        };

        var result = await _roleManager.CreateAsync(newRole);

        if(result.Succeeded)
        {
            foreach(var permission in request.Permissions)
            {
                await _roleManager.AddClaimAsync(newRole, new Claim(Permissions.Type, permission));
            }

            return Result.Success(new RoleDetailResponse()
            {
                Id = newRole.Id,
                Name = request.Name,
                Permissions = request.Permissions,
            });
        }

        var error = result.Errors.First();

        return Result.Failure<RoleDetailResponse>(new Error(error.Code, error.Description, StatusCodes.Status400BadRequest));
    }
}
