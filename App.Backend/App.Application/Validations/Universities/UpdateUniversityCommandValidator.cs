using App.Application.Commands.Universities;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Application.Validations.Universities;

public class UpdateUniversityCommandValidator : AbstractValidator<UpdateUniversityCommand>
{
    public UpdateUniversityCommandValidator()
    {
        RuleFor(x => x.Name)
        .NotEmpty().WithMessage("University name is required.")
        .MaximumLength(200).WithMessage("University name must not exceed 200 characters.");

        RuleFor(x => x.Code)
            .NotEmpty().WithMessage("University code is required.")
            .MaximumLength(50).WithMessage("University code must not exceed 50 characters.");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required.")
            .MaximumLength(500).WithMessage("Description must not exceed 500 characters.");

        RuleFor(x => x.Address)
            .NotEmpty().WithMessage("Address is required.")
            .MaximumLength(300).WithMessage("Address must not exceed 300 characters.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email format.")
            .MaximumLength(200).WithMessage("Email must not exceed 200 characters.");

        RuleFor(x => x.Website)
            .NotEmpty().WithMessage("Website is required.")
            .MaximumLength(300).WithMessage("Website must not exceed 300 characters.");
    }
}
