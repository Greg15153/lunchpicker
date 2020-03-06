using System;

namespace LunchPicker.Domain.SeedWork
{
    public class Metadata
    {
        public Guid CreatedBy { get; private set; }

        public DateTime CreatedDate { get; private set; }

        public Guid ModifiedBy { get; private set; }

        public DateTime ModifiedDate { get; private set; }

        public Metadata(Guid createdBy, DateTime createdDate, Guid modifiedBy, DateTime modifiedDate)
        {
            CreatedBy = createdBy;
            CreatedDate = createdDate;
            ModifiedBy = modifiedBy;
            ModifiedDate = modifiedDate;
        }

        public static Metadata New(Guid createdBy)
        {
            return new Metadata(createdBy, DateTime.UtcNow, createdBy, DateTime.UtcNow);
        }

        public void Update(Guid modifiedBy)
        {
            ModifiedBy = modifiedBy;
            ModifiedDate = DateTime.UtcNow;
        }
    }
}