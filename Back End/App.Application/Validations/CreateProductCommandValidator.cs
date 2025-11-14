using App.Application.Commands.ProductCommands;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Application.Validations;

public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{
    public CreateProductCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .Length(3, 50);
        
        RuleFor(x => x.Description)
            .NotEmpty()
            .Length(3, 100);
    }
}
