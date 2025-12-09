

using App.Application.Constants;
using App.Infrastructure.Localization;

namespace App.Application.Validations.Authentications;

public class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>    
{

    public ResetPasswordCommandValidator(JsonStringLocalizer localizer)
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.Code)
           .NotEmpty();

        RuleFor(x => x.NewPassword)
            .NotEmpty()
            .Matches(RegexPatterns.Password)
            .WithMessage(localizer[LocalizationKeyNames.PasswordRegex, LocalizationFolderNames.Authentication]);
    }
}
