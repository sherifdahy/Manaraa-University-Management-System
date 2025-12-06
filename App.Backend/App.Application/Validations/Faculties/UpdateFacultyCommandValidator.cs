using App.Application.Commands.Faculties;

namespace App.Application.Validations.Faculties;

public class UpdateFacultyCommandValidator : AbstractValidator<UpdateFacultyCommand>
{
    public UpdateFacultyCommandValidator()
    {
        RuleFor(f => f.Id)
            .NotEmpty().WithMessage("Id is required.")
            .GreaterThan(0).WithMessage("Id must be greater than 0.");

        RuleFor(f => f.UniversityId)
            .GreaterThan(0).WithMessage("University Id must be greater than 0.");

        RuleFor(f => f.Name)
            .NotEmpty().WithMessage("Faculty name is required.")
            .MaximumLength(200);


        RuleFor(f => f.Description)
            .MaximumLength(1000);

        RuleFor(f => f.DeanName)
            .MaximumLength(200);

        RuleFor(f => f.Address)
            .MaximumLength(200);

        RuleFor(f => f.Email)
            .EmailAddress().WithMessage("Invalid email format.")
            .MaximumLength(200);

        RuleFor(f => f.Website)
            .MaximumLength(200);
    }
}
