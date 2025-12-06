using App.Application.Responses.Faculties;
namespace App.Application.Commands.Faculties;

public record CreateFacultyCommand(
    string Name,
    string Description,
    string DeanName,
    string Address,
    string Email,
    string Website,
    int UniversityId

) : IRequest<Result<FacultyResponse>>;