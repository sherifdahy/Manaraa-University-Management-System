using App.Core.Entities;
using App.Core.Interfaces;
using SA.Accountring.Core.Entities.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Services;

public class ProductServices(IUnitOfWork unitOfWork) : IProductServices
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<Product> CreateAsync(Product product, CancellationToken cancellationToken)
    {
        await _unitOfWork.Products.AddAsync(product,cancellationToken);
        await _unitOfWork.SaveAsync(cancellationToken);

        return product;
    }
}
