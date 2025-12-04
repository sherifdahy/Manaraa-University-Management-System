using App.Application.Responses.Universities;

namespace App.Application.Queries.Universities;

public record GetAllUniverisitiesQuery() : IRequest<Result<List<UniversityResponse>>>;

