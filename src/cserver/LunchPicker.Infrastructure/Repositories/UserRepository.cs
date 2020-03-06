using System;
using System.Threading.Tasks;
using LunchPicker.Domain.Aggregates.UserAggregate;
using LunchPicker.Domain.SeedWork;
using Microsoft.EntityFrameworkCore;

namespace LunchPicker.Infrastructure.Repositories
{
    public class UserRepository
        : IUserRepository
    {
        private readonly LunchPickerContext _context;

        public IUnitOfWork UnitOfWork => _context;

        public UserRepository(LunchPickerContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public User Add(User user)
        {
            return _context.Users.Add(user).Entity;
        }

        public async Task<User> GetAsync(Guid userId)
        {
            return await _context.Users.SingleOrDefaultAsync(x => x.Id == userId);
        }

        public void Update(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}