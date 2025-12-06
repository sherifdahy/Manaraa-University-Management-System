namespace App.Application.Handlers.Commands.Universities;

public class CreateUniversityCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<CreateUniversityCommand, Result<UniversityResponse>>
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    public async Task<Result<UniversityResponse>> Handle(CreateUniversityCommand request, CancellationToken cancellationToken)
    {
        if (_unitOfWork.Universities.IsExist(x => x.Name == request.Name))
            return Result.Failure<UniversityResponse>(UniversityErrors.DuplicatedName);

        var university = request.Adapt<University>();

        await _unitOfWork.Universities.AddAsync(university, cancellationToken);
        await _unitOfWork.SaveAsync(cancellationToken);

        return Result.Success(university.Adapt<UniversityResponse>());
    }
}
