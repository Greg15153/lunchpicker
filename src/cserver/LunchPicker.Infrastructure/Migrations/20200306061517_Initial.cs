using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LunchPicker.Infrastructure.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "lunchpicker");

            migrationBuilder.CreateSequence(
                name: "$Userentityseq",
                schema: "lunchpicker",
                incrementBy: 10);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    db_id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SequenceHiLo),
                    id = table.Column<Guid>(nullable: false),
                    created_by = table.Column<Guid>(nullable: false),
                    created_date = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    modified_by = table.Column<Guid>(nullable: false),
                    modified_date = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => new { x.db_id, x.id });
                });

            migrationBuilder.CreateTable(
                name: "requests",
                schema: "lunchpicker",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Time = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_requests", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "db_id", "id", "created_by", "created_date", "FirstName", "LastName", "modified_by" },
                values: new object[] { 1, new Guid("dc33de96-0871-4027-9361-d5a7e5bd3bf7"), new Guid("dc33de96-0871-4027-9361-d5a7e5bd3bf7"), new DateTime(2020, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin", "LunchPicker", new Guid("dc33de96-0871-4027-9361-d5a7e5bd3bf7") });

            migrationBuilder.CreateIndex(
                name: "IX_Users_id",
                table: "Users",
                column: "id",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "requests",
                schema: "lunchpicker");

            migrationBuilder.DropSequence(
                name: "$Userentityseq",
                schema: "lunchpicker");
        }
    }
}
