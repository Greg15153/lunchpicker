using System.Collections.Generic;
using Newtonsoft.Json;

namespace LunchPicker.API.Application.Queries.Yelp.Models
{
    public class YelpBusinessResponse
    {
        [JsonProperty("rating")]
        public float Rating { get; set; }

        [JsonProperty("price")]
        public string Price { get; set; }

        [JsonProperty("phone")]
        public string Phone { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("alias")]
        public string Alias { get; set; }

        [JsonProperty("is_closed")]
        public bool IsClosed { get; set; }

        [JsonProperty("categories")]
        public IEnumerable<YelpBusinessCategoryResponse> Categories { get; set; }

        [JsonProperty("review_count")]
        public int ReviewCount { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("coordinates")]
        public YelpCoordinatesResponse Coordinates { get; set; }

        [JsonProperty("image_url")]
        public string ImageUrl { get; set; }

        [JsonProperty("location")]
        public YelpLocationResponse Location { get; set; }

        [JsonProperty("distance")]
        public float Distance { get; set; }

        [JsonProperty("transactions")]
        public IEnumerable<string> Transactions { get; set; }
    }

    public class YelpBusinessCategoryResponse
    {
        [JsonProperty("alias")]
        public string Alias { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }
    }
}