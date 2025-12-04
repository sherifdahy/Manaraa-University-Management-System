using App.Application.Queries.Universities;

namespace App.Application.Handlers.Queries.Universities;

public class GetAllFacultiesQueryHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetAllUniverisitiesQuery, Result<List<UniversityResponse>>>
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    public async Task<Result<List<UniversityResponse>>> Handle(GetAllUniverisitiesQuery request, CancellationToken cancellationToken)
    {
        var universities = await _unitOfWork.Universities.GetAllAsync(cancellationToken);

        var response = universities.Adapt<List<UniversityResponse>>();

        return Result.Success(response);
    }
}
