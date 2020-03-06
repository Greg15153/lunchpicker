using System;
using System.Net;
using System.Threading.Tasks;
using LunchPicker.API.Application.Queries;
using LunchPicker.Domain.Aggregates.UserAggregate;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LunchPicker.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IUserQueries _userQueries;

        public UsersController(IMediator mediator, IUserQueries userQueries)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _userQueries = userQueries ?? throw new ArgumentNullException(nameof(userQueries));
        }

        [Route("{userId}")]
        [HttpGet]
        [ProducesResponseType(typeof(User), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetUserAsync(Guid userId)
        {
            try
            {
                var user = await _userQueries.GetUserAsync(userId);
                return Ok(user);
            }
            catch
            {
                return NotFound();
            }
        }
    }
}