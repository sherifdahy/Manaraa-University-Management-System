using App.Application.Commands.Roles;
using App.Infrastructure.Localization;
using FluentValidation;

namespace App.Application.Validations.Roles;

public class UpdateRoleCommandValidator : AbstractValidator<UpdateRoleCommand>
{
    public UpdateRoleCommandValidator(JsonStringLocalizer localizer)
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .Length(3, 200);


        RuleFor(x => x.Permissions)
            .NotNull()
            .NotEmpty();

        RuleFor(x => x.Permissions).Must(x=>x.Distinct().Count() == x.Count())
            .WithMessage(localizer[LocalizationKeyNames.DuplicatedPermissions,LocalizationFolderNames.Authentication])
            .When(x=>x.Permissions != null);
    
    }
}
