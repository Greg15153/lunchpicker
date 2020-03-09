using Newtonsoft.Json;

namespace LunchPicker.API.Application.Queries.Yelp.Models
{
    public class YelpRegionResponse
    {
        [JsonProperty("center")]
        public YelpCoordinatesResponse Center { get; set; }
    }
}