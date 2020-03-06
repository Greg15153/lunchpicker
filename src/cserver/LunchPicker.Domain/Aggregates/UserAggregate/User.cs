using System;
using System.Runtime.CompilerServices;
using LunchPicker.Domain.SeedWork;

[assembly: InternalsVisibleTo("LunchPicker.Infrastructure")]
namespace LunchPicker.Domain.Aggregates.UserAggregate
{
    public class User
        : Entity, IAggregateRoot
    {
        public string FirstName { get; private set; }
        public string LastName { get; private set; }

        internal User(Guid id, string firstName, string lastName, Guid createdBy, DateTime createdDate, Guid modifiedBy, DateTime modifiedDate)
            : base(id, createdBy, createdDate, modifiedBy, modifiedDate)
        {
            FirstName = firstName;
            LastName = lastName;
        }

        internal User(Guid id, string firstName, string lastName, Metadata metadata)
            : this(id, firstName, lastName, metadata.CreatedBy, metadata.CreatedDate, metadata.ModifiedBy, metadata.ModifiedDate)
        {
            FirstName = firstName;
            LastName = lastName;
        }

        public static User New(string firstName, string lastName, Guid createdBy)
        {
            if (string.IsNullOrWhiteSpace(firstName))
            {
                throw new System.ArgumentNullException(nameof(firstName));
            }

            if (string.IsNullOrWhiteSpace(lastName))
            {
                throw new System.ArgumentNullException(nameof(lastName));
            }

            return new User(Guid.NewGuid(), firstName, lastName, Metadata.New(createdBy));
        }
    }
}