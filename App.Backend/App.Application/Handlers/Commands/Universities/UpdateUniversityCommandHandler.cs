namespace App.Application.Handlers.Commands.Universities;

public class UpdateUniversityCommandHandler(IUnitOfWork unitOfWork): IRequestHandler<UpdateUniversityCommand, Result>
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<Result> Handle(UpdateUniversityCommand request, CancellationToken cancellationToken)
    {
        if (_unitOfWork.Universities.IsExist(x => x.Name == request.Name && x.Id != request.Id))
            return Result.Failure(UniversityErrors.Duplicated);
        
        var university = await _unitOfWork.Universities.GetByIdAsync(request.Id,cancellationToken);

        if (university == null)
            return Result.Failure(UniversityErrors.NotFound);
            
        request.Adapt(university);

        return Result.Success();
    }
}
