using App.Application.Commands.ProductCommands;
using App.Core.Entities.Identity;
using App.Core.Extensions;
using App.Core.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace App.API.Controllers.Product
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(IMediator mediator,IJwtProvider jwtProvider) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;
        private readonly IJwtProvider _jwtProvider = jwtProvider;

        [HttpPost(CreateProductCommand.Route)]
        public async Task<IActionResult> Create(CreateProductCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return result.IsSuccess ? Ok(result.Value) : result.ToProblem();
        }
        [HttpGet("test")]
        public async Task<IActionResult> Test()
        {
            var user = new ApplicationUser
            {
                Id=123,
                UserName = "omarzaky",
                FirstName = "omar",
                LastName = "zaky",
                Email="omarzaky078@gmail.com"
            };
            var (token, expiresIn) = _jwtProvider.GenerateToken(user);
            return Ok(new {token,expiresIn});
        }
        [HttpGet("test02")]
        public async Task<IActionResult> Test02(string token)
        {

            var result = _jwtProvider.ValidateToken(token);
            return Ok(result is null ? "Invalid Token":"Valid Token");
        }
    }
}
