namespace App.Application.Commands.Faculties;

public record UpdateFacultyCommand(
    int Id,
    string Name,
    string Description,
    string DeanName,
    string Address,
    string Email,
    string Website,
    int UniversityId

) : IRequest<Result>;