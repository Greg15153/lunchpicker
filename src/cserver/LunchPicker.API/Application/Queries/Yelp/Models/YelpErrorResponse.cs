using Newtonsoft.Json;

namespace LunchPicker.API.Application.Queries.Yelp.Models
{
    public class YelpErrorResponse
    {
        [JsonProperty("error")]
        public YelpError Error { get; set; }
    }

    public class YelpError
    {
        [JsonProperty("code")]
        public string Code { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
    }
}