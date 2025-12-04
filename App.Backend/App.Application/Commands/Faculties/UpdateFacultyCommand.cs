namespace App.Application.Commands.Faculties;

public record UpdateFacultyCommand(
    int Id,
    string Name,
    string Code,
    string Description,
    string DeanName,
    string Location,
    string Email,
    string Website,
    int UniversityId

) : IRequest<Result>;