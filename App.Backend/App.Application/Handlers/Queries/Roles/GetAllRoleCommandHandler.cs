using App.Application.Abstractions;
using App.Application.Queries.Roles;
using App.Application.Responses.Role;
using App.Core.Entities.Identity;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Application.Handlers.Queries.Roles;

public class GetAllRoleCommandHandler : IRequestHandler<GetAllRolesCommand, Result<List<RoleResponse>>>
{
    private readonly RoleManager<ApplicationRole> _roleManager;

    public GetAllRoleCommandHandler(RoleManager<ApplicationRole> roleManager)
    {
        _roleManager = roleManager;
    }

    public async Task<Result<List<RoleResponse>>> Handle(GetAllRolesCommand request, CancellationToken cancellationToken)
    {
        var roles = await _roleManager
                                .Roles
                                .Where(x=> !x.IsDeleted)
                                .ProjectToType<RoleResponse>().ToListAsync(cancellationToken);
        return Result.Success(roles);
    }
}
