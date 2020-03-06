using System;
using System.Threading.Tasks;
using LunchPicker.Domain.Aggregates.UserAggregate;

namespace LunchPicker.API.Application.Queries
{
    public class UserQueries : IUserQueries
    {
        private readonly IUserRepository _userRepository;

        public UserQueries(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> GetUserAsync(Guid userId)
        {
            return await _userRepository.GetAsync(userId);
        }
    }
}