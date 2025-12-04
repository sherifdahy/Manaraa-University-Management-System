using App.Application.Queries.Faculties;
using App.Application.Responses.Faculties;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Application.Handlers.Queries.Faculties;

public class GetFucaltyCommandHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetFacultyQuery, Result<FacultyDetailResponse>>
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    async Task<Result<FacultyDetailResponse>> IRequestHandler<GetFacultyQuery, Result<FacultyDetailResponse>>.Handle(GetFacultyQuery request, CancellationToken cancellationToken)
    {
        var faculty = await _unitOfWork.Fauclties.FindAsync(x => x.Id == request.Id, new string[] { nameof(University.Faculties) }, cancellationToken);

        if (faculty == null)
            return Result.Failure<FacultyDetailResponse>(FacultyErrors.NotFound);

        var response = faculty.Adapt<FacultyDetailResponse>();

        return Result.Success(response);
    }
}
