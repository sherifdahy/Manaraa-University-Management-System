

using App.Application.Constants;

namespace App.Application.Validations.Authentications;

public class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>    
{

    public ResetPasswordCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.Code)
           .NotEmpty();

        RuleFor(x => x.NewPassword)
            .NotEmpty()
            .Matches(RegexPatterns.Password)
            .WithMessage("Password should be at least 8 digits and should contains Lowercase, NonAlphanumeric and Uppercase");
    }
}
