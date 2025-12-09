using App.Application.Queries.Universities;

namespace App.Application.Handlers.Queries.Universities;

public class GetFacultyQueryHandler (IUnitOfWork unitOfWork, UniversityErrors errors) : IRequestHandler<GetUniversityQuery, Result<UniversityDetailResponse>>
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly UniversityErrors _errors = errors;

    public async Task<Result<UniversityDetailResponse>> Handle(GetUniversityQuery request, CancellationToken cancellationToken)
    {
        var university = await _unitOfWork.Universities.FindAsync(x => x.Id == request.Id, new string[] { nameof(University.Faculties) },cancellationToken);

        if (university == null)
            return Result.Failure<UniversityDetailResponse>(_errors.NotFound);

        var response = university.Adapt<UniversityDetailResponse>();

        return Result.Success(response);
    }
}
