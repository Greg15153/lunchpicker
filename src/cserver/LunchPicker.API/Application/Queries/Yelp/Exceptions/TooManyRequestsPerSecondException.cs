using System;

namespace LunchPicker.API.Application.Queries.Yelp.Exceptions
{
    public class TooManyRequestsPerSecondException : ApplicationException
    {
        public TooManyRequestsPerSecondException()
            : base(ErrorCode.Service, "Querying Yelp Too fast")
        {
        }
    }
}