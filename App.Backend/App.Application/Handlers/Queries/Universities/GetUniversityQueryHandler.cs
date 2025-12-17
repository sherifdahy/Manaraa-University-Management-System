using App.Application.Queries.Universities;
using System.Linq.Expressions;

namespace App.Application.Handlers.Queries.Universities;

public class GetUniversityQueryHandler(IUnitOfWork unitOfWork, UniversityErrors errors) : IRequestHandler<GetUniversityQuery, Result<UniversityDetailResponse>>
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly UniversityErrors _errors = errors;

    public async Task<Result<UniversityDetailResponse>> Handle(GetUniversityQuery request, CancellationToken cancellationToken)
    {
        var university = await _unitOfWork.Universities.FindAsync(x => x.Id == request.Id && x.Faculties.Any(f=>f.IsDeleted == false),
                                                                  new Expression<Func<University, object>>[] { u => u.Faculties.Any(x => x.IsDeleted == true) },
                                                                  cancellationToken);

        if (university == null)
            return Result.Failure<UniversityDetailResponse>(_errors.NotFound);

        var response = university.Adapt<UniversityDetailResponse>();

        return Result.Success(response);
    }
}
