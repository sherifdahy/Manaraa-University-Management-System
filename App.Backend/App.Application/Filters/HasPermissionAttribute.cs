using Microsoft.AspNetCore.Authorization;

namespace App.Application.Filters;
public class HasPermissionAttribute(string permission) : AuthorizeAttribute(permission)
{
}
