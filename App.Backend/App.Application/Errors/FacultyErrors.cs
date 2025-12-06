namespace App.Application.Errors;

public static class FacultyErrors
{
    public static readonly Error NotFound
        = new Error("Faculty.NotFound", "Faculty is Not Exist.", StatusCodes.Status404NotFound);

    public static readonly Error InvalidPermissions
       = new Error("Faculty.InvalidPermissions", "Invalid Permissions.", StatusCodes.Status404NotFound);

    public static readonly Error InvalidId
        = new Error("Faculty.InvalidId", "Invalid Id.", StatusCodes.Status400BadRequest);

    public static readonly Error DuplicatedName =
            new("Faculty.DuplicatedName", "Name of Faculty is Already Exist.", StatusCodes.Status409Conflict);
}
