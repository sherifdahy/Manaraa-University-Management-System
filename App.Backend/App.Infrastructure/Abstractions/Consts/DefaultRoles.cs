using System;
using System.Collections.Generic;
using System.Text;

namespace App.Infrastructure.Abstractions.Consts;

public class DefaultRoles
{
    public const string Admin = nameof(Admin);
    public const string AdminRoleConcurrencyStamp = "51655B45-963A-4DD7-A68F-1F18B3F4BE47";
    public const int AdminRoleId = 1;

    public const string Member = nameof(Member);
    public const string MemberRoleConcurrencyStamp = "9601DE96-3D34-48D0-BA24-4D7C1A9F6C7F";
    public const int MemberRoleId = 2;
}
