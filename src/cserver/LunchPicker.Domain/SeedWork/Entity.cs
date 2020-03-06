using System;
using System.Collections.Generic;
using MediatR;

namespace LunchPicker.Domain.SeedWork
{
    public abstract class Entity
    {
        internal int _id { get; set; }
        public Guid Id { get; protected set; }
        public Guid CreatedBy { get; private set; }
        public DateTime CreatedDate { get; private set; }
        public Guid ModifiedBy { get; protected set; }
        public DateTime ModifiedDate { get; protected set; }

        public Entity(Guid id, Guid createdBy, DateTime createdDate, Guid modifiedBy, DateTime modifiedDate)
        {
            Id = id;
            CreatedBy = createdBy;
            CreatedDate = createdDate;
            ModifiedBy = modifiedBy;
            ModifiedDate = modifiedDate;
        }

        private List<INotification> _domainEvents = new List<INotification>();
        public IReadOnlyCollection<INotification> DomainEvents => _domainEvents?.AsReadOnly();

        public void AddDomainEvent(INotification eventItem)
        {
            _domainEvents.Add(eventItem);
        }

        public void RemoveDomainEvent(INotification eventItem)
        {
            _domainEvents?.Remove(eventItem);
        }

        public void ClearDomainEvents()
        {
            _domainEvents?.Clear();
        }
    }
}