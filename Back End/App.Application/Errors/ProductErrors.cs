using App.Application.Abstractions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Application.Errors;

public static class ProductErrors
{
    public static Error NameDuplicate => new Error("Product.Duplicate","Name of is Already exist Please try another one.",StatusCodes.Status400BadRequest);
}
