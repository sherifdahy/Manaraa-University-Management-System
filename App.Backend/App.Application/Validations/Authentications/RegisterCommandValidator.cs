using App.Application.Commands.Authentications;
using App.Application.Constants;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Application.Validations.Authentications;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.Password)
            .NotEmpty()
            .Matches(RegexPatterns.Password)
            .WithMessage("Password should be at least 8 digits and should contains Lowercase, NonAlphanumeric and Uppercase");

        RuleFor(x => x.FirstName)
            .NotEmpty()
            .Length(3, 100);


        RuleFor(x => x.LastName)
            .NotEmpty()
            .Length(3, 100);
    }
}
