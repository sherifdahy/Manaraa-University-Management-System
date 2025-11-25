using App.Application.Abstractions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Application.Commands.Roles;

public class ToggleStatusRoleCommand : IRequest<Result>
{
    public const string Route = "{id}/toggle-status";
    public int Id { get; set; }

    public ToggleStatusRoleCommand(int id)
    {
        Id = id;
    }

}
