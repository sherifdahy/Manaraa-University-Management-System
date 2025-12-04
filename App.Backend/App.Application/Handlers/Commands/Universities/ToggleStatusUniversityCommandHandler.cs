namespace App.Application.Handlers.Commands.Universities;

public class ToggleStatusUniversityCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<ToggleStatusUniveristyCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    public async Task<Result> Handle(ToggleStatusUniveristyCommand request, CancellationToken cancellationToken)
    {
        var university = await _unitOfWork.Universities.GetByIdAsync(request.Id);

        if (university is null)
            return Result.Failure(UniversityErrors.NotFound);

        university.IsDeleted = !university.IsDeleted;

        return Result.Success();
    }
}
