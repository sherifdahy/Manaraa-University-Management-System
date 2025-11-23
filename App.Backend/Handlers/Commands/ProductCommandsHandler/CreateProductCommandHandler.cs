using App.Application.Abstractions;
using App.Application.Commands.ProductCommands;
using App.Application.Errors;
using App.Application.Responses;
using App.Core.Entities;
using App.Core.Interfaces;
using Mapster;
using MediatR;
using SA.Accountring.Core.Entities.Interfaces;

namespace App.Application.Handlers.Commands.ProductCommandsHandler;

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Result<ProductResponse>>
{
    private readonly IProductServices _productServices;
    private readonly IUnitOfWork _unitOfWork;

    public CreateProductCommandHandler(IProductServices productServices,IUnitOfWork unitOfWork)
    {
        _productServices = productServices;
        _unitOfWork = unitOfWork;
    }
    public async Task<Result<ProductResponse>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        if (_unitOfWork.Products.IsExist(x => x.Name == request.Name))
            return Result.Failure<ProductResponse>(ProductErrors.NameDuplicate);

        var oData = request.Adapt<Product>();
        
        await _productServices.CreateAsync(oData, cancellationToken);
        
        return Result.Success<ProductResponse>(oData.Adapt<ProductResponse>());
    }
}
