using App.Application.Abstractions;
using App.Application.Commands.Roles;
using App.Application.Errors;
using App.Application.Responses.Role;
using App.Core.Entities.Identity;
using App.Infrastructure.Abstractions.Consts;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace App.Application.Handlers.Commands.Roles;

public class UpdateRoleCommandHandler(RoleManager<ApplicationRole> roleManager) : IRequestHandler<UpdateRoleCommand, Result>
{
    private readonly RoleManager<ApplicationRole> _roleManager = roleManager;

    public async Task<Result> Handle(UpdateRoleCommand request, CancellationToken cancellationToken)
    {
        if (await _roleManager.Roles.AnyAsync(x=>x.Name == request.Name && x.Id != request.Id))
            return Result.Failure(RoleErrors.Duplicated);

        var allawedPermissions = Permissions.GetAllPermissions();

        if (request.Permissions.Except(allawedPermissions).Any())
            return Result.Failure<RoleDetailResponse>(RoleErrors.InvalidPermissions);

        if (await _roleManager.FindByIdAsync(request.Id.ToString()) is not { } role)
            return Result.Failure(RoleErrors.NotFound);

        role.Name = request.Name;

        var result = await _roleManager.UpdateAsync(role);

        if(result.Succeeded)
        {
            var currentPermissions = await _roleManager.GetClaimsAsync(role);

            var newPermissions = request.Permissions.Except(currentPermissions.Select(x => x.Value));

            foreach(var permission in newPermissions)
            {
                var claim = new Claim(Permissions.Type, permission);
                await _roleManager.AddClaimAsync(role, claim);
            }

            var removedPermissions = currentPermissions.Select(x=>x.Value).Except(request.Permissions);

            foreach(var permission in removedPermissions)
            {
                var claim = new Claim(Permissions.Type, permission);
                await _roleManager.RemoveClaimAsync(role, claim);
            }

            return Result.Success();
        }

        var error = result.Errors.First();
        
        return Result.Failure(new Error(error.Code, error.Description,StatusCodes.Status400BadRequest));
    }
}
