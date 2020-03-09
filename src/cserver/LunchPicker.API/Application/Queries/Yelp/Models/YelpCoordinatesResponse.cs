using Newtonsoft.Json;

namespace LunchPicker.API.Application.Queries.Yelp.Models
{
    public class YelpCoordinatesResponse
    {
        [JsonProperty("latitude")]
        public float Latitude { get; set; }

        [JsonProperty("longitude")]
        public float Longitude { get; set; }
    }
}