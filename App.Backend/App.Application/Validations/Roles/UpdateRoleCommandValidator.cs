using App.Application.Commands.Roles;

namespace App.Application.Validations.Roles;

public class UpdateRoleCommandValidator : AbstractValidator<UpdateRoleCommand>
{
    public UpdateRoleCommandValidator()
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
