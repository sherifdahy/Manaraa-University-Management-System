using System;
using System.Collections.Generic;
using System.Text;

namespace App.Application.Responses.Role;

public class RoleDetailResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsDeleted { get; set; }
    public IEnumerable<string> Permissions { get; set; } = [];
}
