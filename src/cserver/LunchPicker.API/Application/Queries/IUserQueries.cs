using System;
using System.Threading.Tasks;
using LunchPicker.Domain.Aggregates.UserAggregate;

namespace LunchPicker.API.Application.Queries
{
    public interface IUserQueries
    {
        Task<User> GetUserAsync(Guid userId);
    }
}