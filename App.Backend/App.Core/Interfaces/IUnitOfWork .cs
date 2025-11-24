using App.Core.Entities;
using App.Core.Entities.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;

namespace SA.Accountring.Core.Entities.Interfaces;
public interface IUnitOfWork : IDisposable
{
    //public IRepository<Product> Products { get; }
    Task<int> SaveAsync(CancellationToken cancellationToken = default);
    Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default);
}
