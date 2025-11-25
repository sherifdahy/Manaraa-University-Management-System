using App.Application.Commands.Roles;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Application.Validations.Roles;

public class RoleValidator : AbstractValidator<CreateRoleCommand>
{
    public RoleValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Role name is required.")
            .Length(3, 200);


        RuleFor(x => x.Permissions)
            .NotNull()
            .NotEmpty();

        RuleFor(x => x.Permissions).Must(x=>x.Distinct().Count() == x.Count())
            .WithMessage("You cannot add Duplicated Permissions for the same Role")
            .When(x=>x.Permissions != null);
    
    }
}
