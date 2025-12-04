using App.Application.Commands.Faculties;

namespace App.Application.Handlers.Commands.Faculties;

public class ToggleStatusFacultyCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<ToggleStatusFacultyCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<Result> Handle(ToggleStatusFacultyCommand request, CancellationToken cancellationToken)
    {

        var faculty = await _unitOfWork.Fauclties.GetByIdAsync(request.Id);

        if (faculty is null)
            return Result.Failure(FacultyErrors.NotFound);

        faculty.IsDeleted = !faculty.IsDeleted;

        return Result.Success();
    }
}
