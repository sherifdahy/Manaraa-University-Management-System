using App.Application.Abstractions;
using App.Application.Responses;
using MediatR;

namespace App.Application.Commands.ProductCommands;

public class CreateProductCommand : IRequest<Result<ProductResponse>>
{
    public const string Route = "/api/products";

    public string Name { get; set; }
    public string Description { get; set; }

    public CreateProductCommand(string name,string description)
    {
        Name = name;
        Description = description;
    }
}
