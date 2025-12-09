using App.Infrastructure.Localization.Constants;
using App.Infrastructure.Localization.Localizers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace App.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
    private readonly JsonStringLocalizer _localizer;

    public TestController(JsonStringLocalizer localizer)
    {
        _localizer = localizer;
    }

    [HttpGet("test-files")]
    public IActionResult Test()
    {

        var message = _localizer.GetString("greaterThan", LocalizationFolderNames.Authentication);
        return message is not null ?Ok(message):BadRequest();
    }
}
