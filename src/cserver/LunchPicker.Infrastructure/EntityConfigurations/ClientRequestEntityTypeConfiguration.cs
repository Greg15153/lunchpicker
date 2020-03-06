using LunchPicker.Infrastructure.Idempotency;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LunchPicker.Infrastructure
{
    class ClientRequestEntityTypeConfiguration
        : IEntityTypeConfiguration<ClientRequest>
    {
        public void Configure(EntityTypeBuilder<ClientRequest> requestConfiguration)
        {
            requestConfiguration.ToTable("requests", LunchPickerContext.DEFAULT_SCHEMA);
            requestConfiguration.HasKey(cr => cr.Id);
            requestConfiguration.Property(cr => cr.Name).IsRequired();
            requestConfiguration.Property(cr => cr.Time).IsRequired();
        }
    }
}