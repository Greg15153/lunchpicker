using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using LunchPicker.API.Application.Models;
using LunchPicker.API.Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LunchPicker.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BusinessesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IBusinessQueries _businessQueries;

        // TODO: Properly inject and retrieve BusinessQueries based on Provider
        public BusinessesController(IMediator mediator, IBusinessQueries businessQueries)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _businessQueries = businessQueries ?? throw new ArgumentNullException(nameof(businessQueries));
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Business>), (int)HttpStatusCode.OK)]
        // TODO: Create Common Error Response
        public async Task<IActionResult> GetBusinessesAsync(
            [FromQuery]float? longitude,
            [FromQuery]float? latitude,
            [FromQuery]string search,
            [FromQuery]int miles = 10,
            [FromQuery]BusinessProvider provider = BusinessProvider.Yelp
        )
        {
            // TODO: Add Validator
            if (!string.IsNullOrWhiteSpace(search))
            {
                return Ok(await _businessQueries.GetBusinessesAsync(search, miles));
            }

            if (longitude.HasValue && latitude.HasValue)
            {
                return Ok(await _businessQueries.GetBusinessesAsync(latitude.Value, longitude.Value, miles));
            }

            return BadRequest();
        }
    }
}