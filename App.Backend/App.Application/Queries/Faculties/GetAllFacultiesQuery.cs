using App.Application.Responses.Faculties;

namespace App.Application.Queries.Faculties;

public record GetAllFacultiesQuery : IRequest<Result<List<FacultyResponse>>>;