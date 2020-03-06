﻿// <auto-generated />
using System;
using LunchPicker.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LunchPicker.Infrastructure.Migrations
{
    [DbContext(typeof(LunchPickerContext))]
    partial class LunchPickerContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("Relational:Sequence:lunchpicker.$Userentityseq", "'$Userentityseq', 'lunchpicker', '1', '10', '', '', 'Int64', 'False'");

            modelBuilder.Entity("LunchPicker.Domain.Aggregates.UserAggregate.User", b =>
                {
                    b.Property<int>("_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("db_id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:HiLoSequenceName", "$Userentityseq")
                        .HasAnnotation("Npgsql:HiLoSequenceSchema", "lunchpicker")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SequenceHiLo);

                    b.Property<Guid>("Id")
                        .HasColumnName("id")
                        .HasColumnType("uuid");

                    b.Property<Guid>("CreatedBy")
                        .HasColumnName("created_by")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("created_date")
                        .HasColumnType("timestamp without time zone")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<Guid>("ModifiedBy")
                        .HasColumnName("modified_by")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("ModifiedDate")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnName("modified_date")
                        .HasColumnType("timestamp without time zone")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.HasKey("_id", "Id");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            _id = 1,
                            Id = new Guid("dc33de96-0871-4027-9361-d5a7e5bd3bf7"),
                            CreatedBy = new Guid("dc33de96-0871-4027-9361-d5a7e5bd3bf7"),
                            CreatedDate = new DateTime(2020, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            FirstName = "Admin",
                            LastName = "LunchPicker",
                            ModifiedBy = new Guid("dc33de96-0871-4027-9361-d5a7e5bd3bf7"),
                            ModifiedDate = new DateTime(2020, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("LunchPicker.Infrastructure.Idempotency.ClientRequest", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Time")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.ToTable("requests","lunchpicker");
                });
#pragma warning restore 612, 618
        }
    }
}
