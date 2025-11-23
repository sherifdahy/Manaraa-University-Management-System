using App.Core.Entities.Personnel;
using App.Core.Entities.UniversityStructure;
using MappingOfManaraaProject.Entities.AcademicStructure;

namespace MappingOfManaraaProject.Entities.Relations;

public class SubjectSemesterDoctorStudent
{
    public int SubjectId { get; set; }
    public int SemesterId { get; set; }
    public int DoctorId { get; set; }
    public int StudentId { get; set; }

    public Subject Subject { get; set; } = default!;
    public Semester Semester { get; set; } = default!;
    public Doctor Doctor { get; set; } = default!;
    public Student Student { get; set; } = default!;
}
