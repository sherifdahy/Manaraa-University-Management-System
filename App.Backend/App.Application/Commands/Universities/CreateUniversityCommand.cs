namespace App.Application.Commands.Universities;

public record CreateUniversityCommand
(
    string Name,
    string Code,
    string Description,
    string Address,
    string Email,
    string Website
) : IRequest<Result<UniversityResponse>>;
