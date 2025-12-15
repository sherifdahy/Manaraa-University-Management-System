namespace App.Application.Responses.Faculties;

public record FacultyDetailResponse
(
    string Name,
    string Description,
    string DeanName,
    string Address,
    string Email,
    string Website
);
