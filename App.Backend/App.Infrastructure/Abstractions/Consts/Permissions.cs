using System;
using System.Collections.Generic;
using System.Text;

namespace App.Infrastructure.Abstractions.Consts;

public class Permissions
{
    public static string Type { get; } = "permissions";


    // Role Permissions

    public const string GetRoles = "roles:read";
    public const string CreateRoles = "roles:create";
    public const string UpdateRoles = "roles:update";
    public const string ToggleStatusRoles = "roles:delete";


    public static IList<string> GetAllPermissions()
    {
        return typeof(Permissions).GetFields().Select(x=>x.GetValue(x) as string).ToList()!;
    }
}
