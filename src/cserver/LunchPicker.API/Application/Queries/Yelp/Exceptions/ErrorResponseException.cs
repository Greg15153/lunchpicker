using LunchPicker.API.Application.Queries.Yelp.Models;

namespace LunchPicker.API.Application.Queries.Yelp.Exceptions
{
    public class ErrorResponseException : ApplicationException
    {
        public ErrorResponseException(YelpErrorResponse errorResponse)
            : base(ErrorCode.Service, "Yelp returned an error")
        {
            Data.Add("error", errorResponse);
        }
    }
}