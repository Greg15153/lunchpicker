using System;

namespace LunchPicker.API.Application.Queries.Yelp.Exceptions
{
    public class RateLimitReachedException : ApplicationException
    {
        public RateLimitReachedException(int dailyLimit, DateTime resetTime)
            : base(ErrorCode.Service, "Yelp Rate Limit reached")
        {
            Data.Add("dailyLimit", dailyLimit);
            Data.Add("resetTime", resetTime);
        }
    }
}