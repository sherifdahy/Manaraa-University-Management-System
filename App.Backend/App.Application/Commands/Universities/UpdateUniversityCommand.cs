using Microsoft.AspNetCore.Mvc;

namespace App.Application.Commands.Universities;

public record UpdateUniversityCommand 
(
    int Id,
    string Name,
    string Description,
    string Address,
    string Email,
    string Website
) : IRequest<Result>;
