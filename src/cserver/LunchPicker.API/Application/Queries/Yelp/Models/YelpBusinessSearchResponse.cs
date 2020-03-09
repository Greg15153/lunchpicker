using System.Collections.Generic;
using System.Linq;
using LunchPicker.API.Application.Models;
using Newtonsoft.Json;

namespace LunchPicker.API.Application.Queries.Yelp.Models
{
    public class YelpBusinessSearchResponse
    {
        [JsonProperty("total")]
        public int Total { get; set; }

        [JsonProperty("businesses")]
        public IEnumerable<YelpBusinessResponse> Businesses { get; set; }

        [JsonProperty("region")]
        public YelpRegionResponse Region { get; set; }

        public IEnumerable<Business> ToApplicationModel()
        {
            if (!this.Businesses.Any())
            {
                return new Business[] { };
            }

            return this.Businesses.Select(b =>
            {
                return new Business
                {
                    Id = b.Id,
                    Name = b.Name,
                    Image = b.ImageUrl,
                    Url = b.Url
                };
            });
        }
    }
}