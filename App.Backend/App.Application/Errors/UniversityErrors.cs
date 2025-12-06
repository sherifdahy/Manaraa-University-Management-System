namespace App.Application.Errors;

public static class UniversityErrors
{
    public static readonly Error NotFound
        = new Error("University.NotFound", "University is Not Exist.", StatusCodes.Status404NotFound);

    public static readonly Error InvalidPermissions
       = new Error("University.InvalidPermissions", "Invalid Permissions.", StatusCodes.Status404NotFound);

    public static readonly Error InvalidId
        = new Error("University.InvalidId", "Invalid Id.", StatusCodes.Status400BadRequest);

    public static readonly Error DuplicatedName =
            new("University.DuplicatedName", "Name of University is Already Exist.", StatusCodes.Status409Conflict);
}
