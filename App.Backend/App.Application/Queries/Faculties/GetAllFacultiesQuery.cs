using App.Application.Responses.Faculties;

namespace App.Application.Queries.Faculties;

public record GetAllFacultiesQuery
(
    bool? IncludeDisabled

) : IRequest<Result<List<FacultyResponse>>>;