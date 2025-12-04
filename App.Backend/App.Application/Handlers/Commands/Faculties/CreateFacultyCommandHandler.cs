using App.Application.Commands.Faculties;
using App.Application.Responses.Faculties;

namespace App.Application.Handlers.Commands.Faculties;

public class CreateFacultyCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<CreateFacultyCommand, Result<FacultyResponse>>
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<Result<FacultyResponse>> Handle(CreateFacultyCommand request, CancellationToken cancellationToken)
    {
        var faculty = request.Adapt<Faculty>();

        await _unitOfWork.Fauclties.AddAsync(faculty,cancellationToken);
        await _unitOfWork.SaveAsync(cancellationToken);

        return Result.Success(request.Adapt<FacultyResponse>());
    }
}
