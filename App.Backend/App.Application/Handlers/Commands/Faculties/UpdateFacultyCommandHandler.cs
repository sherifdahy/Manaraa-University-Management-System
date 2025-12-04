using App.Application.Commands.Faculties;

namespace App.Application.Handlers.Commands.Faculties;

public class UpdateFacultyCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<UpdateFacultyCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<Result> Handle(UpdateFacultyCommand request, CancellationToken cancellationToken)
    {
        if (_unitOfWork.Fauclties.IsExist(x => x.Name == request.Name && x.Id != request.Id))
            return Result.Failure(FacultyErrors.Duplicated);

        var faculty = await _unitOfWork.Fauclties.GetByIdAsync(request.Id, cancellationToken);

        if (faculty == null)
            return Result.Failure(FacultyErrors.NotFound);

        request.Adapt(faculty);

        return Result.Success();
    }
}
