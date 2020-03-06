using System;
using LunchPicker.Domain.Aggregates.UserAggregate;
using LunchPicker.Domain.SeedWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LunchPicker.Infrastructure.EntityConfigurations
{
    class UserEntityTypeConfiguration : EntityEntityTypeConfiguration<User>
    {
        public new void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);

            // Properties
            builder
                .Property(u => u.FirstName)
                .HasColumnName("first_name")
                .HasMaxLength(255)
                .IsRequired(true);

            builder
                .Property(u => u.LastName)
                .HasColumnName("last_name")
                .HasMaxLength(255)
                .IsRequired(true);

            // Ignore
            builder.Ignore(u => u.DomainEvents);
        }
    }
}