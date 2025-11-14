using App.Core.Entities;
using App.Core.Entities.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;
using SA.Accountring.Core.Entities.Interfaces;

namespace App.Infrastructure.Repository;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;

        Products = new Repository<Product>(_context);
    }

    public IRepository<Product> Products { get; }
    public async Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default)
    {
         return await _context.Database.BeginTransactionAsync(cancellationToken);
    }
    public void Dispose()
    {
        _context.Dispose();
    }
    public async Task<int> SaveAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }
}
