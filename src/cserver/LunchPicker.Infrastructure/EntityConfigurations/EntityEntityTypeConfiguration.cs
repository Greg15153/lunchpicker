using System;
using LunchPicker.Domain.Aggregates.UserAggregate;
using LunchPicker.Domain.SeedWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LunchPicker.Infrastructure.EntityConfigurations
{
    class EntityEntityTypeConfiguration<T> : IEntityTypeConfiguration<T>
        where T : Entity
    {
        public void Configure(EntityTypeBuilder<T> builder)
        {
            var type = typeof(T);

            // Keys
            builder.HasKey("_id", "Id");
            builder.HasIndex("Id").IsUnique();

            // Properties
            builder
                .Property<int>("_id")
                .UsePropertyAccessMode(PropertyAccessMode.Field)
                .HasColumnName("db_id")
                .IsRequired(true)
                .UseHiLo($"${type.Name}entityseq", LunchPickerContext.DEFAULT_SCHEMA);

            builder
                .Property<Guid>(t => t.Id)
                .HasColumnName("id")
                .ValueGeneratedNever()
                .IsRequired(true);

            builder
                .Property<Guid>(t => t.CreatedBy)
                .HasColumnName("created_by")
                .ValueGeneratedNever()
                .IsRequired(true);

            builder
                .Property<DateTime>(t => t.CreatedDate)
                .HasColumnName("created_date")
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired(true);

            builder
                .Property<Guid>(t => t.ModifiedBy)
                .HasColumnName("modified_by")
                .IsRequired(true);

            builder
                .Property<DateTime>(t => t.ModifiedDate)
                .HasColumnName("modified_date")
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .IsRequired(true);

            // Ignore
            builder.Ignore(u => u.DomainEvents);
        }
    }
}
