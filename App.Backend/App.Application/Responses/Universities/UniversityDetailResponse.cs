using App.Application.Responses.Faculties;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Application.Responses.Universities;

public record UniversityDetailResponse
{
    public int Id;
    public string Name =string.Empty;
    public string Description = string.Empty;
    public string Address = string.Empty;
    public string Email = string.Empty;
    public string Website = string.Empty;
    public List<FacultyDetailResponse> Faculties = [];
}
