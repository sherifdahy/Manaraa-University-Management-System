using App.Application.Commands.Authentications;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Application.Validations.Authentications;

public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.Password).NotEmpty().WithMessage("The Password Must Be Not Empty");
    }
}
