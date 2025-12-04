using App.Application.Responses.Faculties;

namespace App.Application.Commands.Faculties;

public record CreateFacultyCommand(
    string Name,
    string Code,
    string Description,
    string DeanName,
    string Location,
    string Email,
    string Website,
    int UniversityId

) : IRequest<Result<FacultyResponse>>;