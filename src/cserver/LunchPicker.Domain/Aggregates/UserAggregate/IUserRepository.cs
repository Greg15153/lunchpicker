using System;
using System.Threading.Tasks;
using LunchPicker.Domain.SeedWork;

namespace LunchPicker.Domain.Aggregates.UserAggregate
{
    public interface IUserRepository : IRepository<User>
    {
        User Add(User user);
        Task<User> GetAsync(Guid userId);
        void Update(User user);
    }
}