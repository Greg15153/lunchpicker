using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using LunchPicker.API.Application.Models;
using LunchPicker.API.Application.Queries.Yelp.Exceptions;
using LunchPicker.API.Application.Queries.Yelp.Models;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace LunchPicker.API.Application.Queries.Yelp
{
    public class YelpBusinessQueries : IBusinessQueries
    {
        private readonly string _apiKey;
        private readonly IHttpClientFactory _clientFactory;
        private readonly ILogger _logger;
        private bool _rateLimitReached = false;
        private int _dailyRate = 5000;
        private DateTime? _resetDate;

        public YelpBusinessQueries(IOptions<YelpOptions> yelpOptions, IHttpClientFactory clientFactory, ILogger<YelpBusinessQueries> logger)
        {
            if (yelpOptions.Value == null || string.IsNullOrWhiteSpace(yelpOptions.Value.ApiKey))
            {
                throw new ArgumentNullException("yelpOptions.ApiKey");
            }

            _apiKey = yelpOptions.Value.ApiKey;
            _clientFactory = clientFactory ?? throw new ArgumentNullException(nameof(clientFactory));
            _logger = logger;
        }

        private int GetRadius(int miles)
        {
            if (miles == 0 || miles > 25)
            {
                miles = 10;
            }

            return (int)Math.Ceiling(miles / 0.00062137);
        }

        // TODO: Implement Pagination Models
        public async Task<IEnumerable<Business>> GetBusinessesAsync(float latitude, float longitude, int miles)
        {
            var query = new Dictionary<string, string>
            {
                ["latitude"] = latitude.ToString(),
                ["longitude"] = longitude.ToString()
            };

            return await GetBusinessesAsync(query, miles);
        }

        public async Task<IEnumerable<Business>> GetBusinessesAsync(string locationSearch, int miles)
        {
            var query = new Dictionary<string, string>
            {
                ["location"] = locationSearch
            };

            return await GetBusinessesAsync(query, miles);
        }

        private async Task<IEnumerable<Business>> GetBusinessesAsync(Dictionary<string, string> query, int miles)
        {
            query.Add("radius", GetRadius(miles).ToString());
            query.Add("term", "food");

            var url = QueryHelpers.AddQueryString("https://api.yelp.com/v3/businesses/search", query);
            var request = new HttpRequestMessage(HttpMethod.Get, url);

            var result = await SendRequest<YelpBusinessSearchResponse>(request);

            return result.ToApplicationModel();
        }

        private async Task<T> SendRequest<T>(HttpRequestMessage request)
        {
            request.Headers.Add("Authorization", $"Bearer {_apiKey}");

            var client = _clientFactory.CreateClient();

            CheckRateReset();
            if (_rateLimitReached)
            {
                throw new RateLimitReachedException(_dailyRate, _resetDate.Value);
            }

            _logger.LogInformation("Sending Yelp Request");

            var response = await client.SendAsync(request);

            response.Headers.TryGetValues("RateLimit-DailyLimit", out var dailyLimitStrings);
            response.Headers.TryGetValues("RateLimit-Remaining", out var remainingStrings);
            response.Headers.TryGetValues("RateLimit-ResetTime", out var resetTimeStrings);

            int.TryParse(dailyLimitStrings.FirstOrDefault() ?? "", out var dailyLimit);
            int.TryParse(remainingStrings.FirstOrDefault() ?? "", out var remainingLimit);
            DateTime.TryParse(resetTimeStrings.FirstOrDefault() ?? "", out var resetTime);

            _logger.LogInformation("Yelp Request Finished: DailyLimit: {dailyLimit}, RemainingLimit: {remainingLimit}, ResetTime: {resetTime}", dailyLimit, remainingLimit, resetTime);

            if (response.IsSuccessStatusCode)
            {
                var body = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<T>(body);
            }
            else
            {
                var body = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<YelpErrorResponse>(body);

                switch (result.Error.Code)
                {
                    case "ACCESS_LIMIT_REACHED":
                        _rateLimitReached = true;
                        _resetDate = resetTime;
                        _dailyRate = dailyLimit;

                        throw new RateLimitReachedException(dailyLimit, resetTime);
                    case "TOO_MANY_REQUESTS_PER_SECOND":
                        _rateLimitReached = true;
                        _resetDate = DateTime.UtcNow.AddSeconds(5);
                        throw new TooManyRequestsPerSecondException();
                    default:
                        throw new ErrorResponseException(result);
                }
            }
        }

        private void CheckRateReset()
        {
            if (!_rateLimitReached)
            {
                return;
            }

            if (_resetDate < DateTime.UtcNow)
            {
                _rateLimitReached = false;
                _resetDate = null;
            }

            return;
        }
    }
}