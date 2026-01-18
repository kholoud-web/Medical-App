using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Diagnosis.Infrastracture.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ReceiveEmailNotifications = table.Column<bool>(type: "bit", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Diagnosises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatientSymptoms = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Diagnosises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Faqs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Question = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Faqs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhysiotherapyExercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BodyPart = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Difficulty = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DurationMinutes = table.Column<int>(type: "int", nullable: false),
                    YoutubeUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ThumbnailUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhysiotherapyExercises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Requests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Reply = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Requests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UsageConfig",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaxRequestsPerDay = table.Column<int>(type: "int", nullable: false),
                    AiEnabled = table.Column<bool>(type: "bit", nullable: false),
                    MaxDiagnosisPerDay = table.Column<int>(type: "int", nullable: false),
                    WorkHoursPweDoctor = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsageConfig", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Doctors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    FName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Specialization = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NationalId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BirhDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastResetDate = table.Column<DateOnly>(type: "date", nullable: false),
                    DiagnosisPerDay = table.Column<int>(type: "int", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExperienceYears = table.Column<int>(type: "int", nullable: true),
                    Rating = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ProfileImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "GETUTCDATE()"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doctors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Doctors_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    UserType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NotificationType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsRead = table.Column<bool>(type: "bit", nullable: false),
                    RelatedId = table.Column<int>(type: "int", nullable: true),
                    RelatedType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReadAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "GETUTCDATE()"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    FName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BloodType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Allergies = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfileImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsNewPatient = table.Column<bool>(type: "bit", nullable: true),
                    IsUrgent = table.Column<bool>(type: "bit", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "GETUTCDATE()"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Patients_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Usages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UsedRequestsToday = table.Column<int>(type: "int", nullable: false),
                    LastResetDate = table.Column<DateOnly>(type: "date", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Usages_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ReceiveEmailNotifications = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSettings_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClinicalFindings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiagnosisId = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClinicalFindings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClinicalFindings_Diagnosises_DiagnosisId",
                        column: x => x.DiagnosisId,
                        principalTable: "Diagnosises",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SuggestedMedications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Frequency = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Dosage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiagnosisId = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SuggestedMedications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SuggestedMedications_Diagnosises_DiagnosisId",
                        column: x => x.DiagnosisId,
                        principalTable: "Diagnosises",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Symptoms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiagnosisId = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Symptoms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Symptoms_Diagnosises_DiagnosisId",
                        column: x => x.DiagnosisId,
                        principalTable: "Diagnosises",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DoctorId = table.Column<int>(type: "int", nullable: false),
                    AppointmentId = table.Column<int>(type: "int", nullable: true),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PaymentMethod = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "GETUTCDATE()"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payments_Doctors_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "Doctors",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Consultations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    DoctorId = table.Column<int>(type: "int", nullable: false),
                    Symptoms = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ConfidenceLevel = table.Column<int>(type: "int", nullable: false),
                    FileUrls = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiagnosisName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RejectReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RejectNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "GETUTCDATE()"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consultations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Consultations_Doctors_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "Doctors",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Consultations_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MedicalFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "GETUTCDATE()"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MedicalFiles_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SupportTickets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Reply = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DoctorId = table.Column<int>(type: "int", nullable: true),
                    PatientId = table.Column<int>(type: "int", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupportTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupportTickets_AspNetUsers_userId",
                        column: x => x.userId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SupportTickets_Doctors_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "Doctors",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SupportTickets_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TreatmentPlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatientId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PatientId1 = table.Column<int>(type: "int", nullable: true),
                    DoctorId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TreatmentPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TreatmentPlans_AspNetUsers_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TreatmentPlans_Patients_PatientId1",
                        column: x => x.PatientId1,
                        principalTable: "Patients",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "role-admin", null, "Admin", "ADMIN" },
                    { "role-doctor", null, "Doctor", "DOCTOR" },
                    { "role-patient", null, "Patient", "PATIENT" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "ReceiveEmailNotifications", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "user-0", 0, "0008ce66-58bf-4d06-a864-2104e3d757c2", "admin@diagnosis.com", true, false, null, "ADMIN@DIAGNOSIS.COM", "ADMIN@DIAGNOSIS.COM", "", null, false, true, "6296fc3c-30ba-4b71-98a8-b5403102b5b1", false, "admin@diagnosis.com" },
                    { "user-1", 0, "f00860c9-fecd-4c2e-8f58-39f413eb0562", "doctor@test.com", true, false, null, "DOCTOR@TEST.COM", "DOCTOR@TEST.COM", "", null, false, true, "stamp1", false, "doctor@test.com" },
                    { "user-2", 0, "9278384e-7943-4f7e-9b61-1356da6207b1", "patient@test.com", true, false, null, "PATIENT@TEST.COM", "PATIENT@TEST.COM", "", null, false, true, "stamp2", false, "patient@test.com" }
                });

            migrationBuilder.InsertData(
                table: "Diagnosises",
                columns: new[] { "Id", "CreatedOn", "Description", "IsDeleted", "ModifiedOn", "Name", "PatientSymptoms", "Title" },
                values: new object[,]
                {
                    { 1, null, "Viral infection affecting upper respiratory tract", false, null, "Upper Respiratory Infection", "Fever, cough, sore throat, runny nose", "Cold & Flu" },
                    { 2, null, "Inflammation of stomach lining", false, null, "Gastritis", "Abdominal pain, nausea, vomiting", "Stomach Pain" },
                    { 3, null, "Chronic elevation of blood pressure", false, null, "High Blood Pressure", "Headache, dizziness, blurred vision", "Hypertension" },
                    { 4, null, "Routine diabetes follow-up and monitoring", false, null, "Type 2 Diabetes Mellitus", "Fatigue, frequent urination", "Diabetes Follow-up" }
                });

            migrationBuilder.InsertData(
                table: "Faqs",
                columns: new[] { "Id", "Answer", "CreatedOn", "IsDeleted", "ModifiedOn", "Question", "Type" },
                values: new object[,]
                {
                    { 1, "You can book an appointment through the mobile application.", null, false, null, "How can I book an appointment?", "Patient" },
                    { 2, "Yes, you can cancel or reschedule your appointment from your profile.", null, false, null, "Can I cancel or reschedule my appointment?", "Patient" },
                    { 3, "Your medical history is available in the medical records section.", null, false, null, "How do I view my medical history?", "Patient" },
                    { 4, "Yes, all your data is securely stored and protected.", null, false, null, "Is my personal data secure?", "Patient" },
                    { 5, "You can manage your appointments from the doctor dashboard.", null, false, null, "How can I manage my appointments?", "Doctor" },
                    { 6, "You can update your availability from your profile settings.", null, false, null, "How do I update my availability?", "Doctor" },
                    { 7, "Yes, you can access medical records for patients assigned to you.", null, false, null, "Can I access patient medical records?", "Doctor" },
                    { 8, "Payments are transferred to your registered bank account.", null, false, null, "How do I receive payments?", "Doctor" }
                });

            migrationBuilder.InsertData(
                table: "PhysiotherapyExercises",
                columns: new[] { "Id", "BodyPart", "Difficulty", "DurationMinutes", "ThumbnailUrl", "Title", "YoutubeUrl" },
                values: new object[,]
                {
                    { 1, "Back", "Easy", 4, "https://img.youtube.com/vi/4BOTvaRaDjI/hqdefault.jpg", "Back Stretch Exercise", "https://www.youtube.com/watch?v=4BOTvaRaDjI" },
                    { 2, "Back", "Easy", 6, "https://img.youtube.com/vi/DWmGArQBtFI/hqdefault.jpg", "Lower Back Mobility Routine", "https://www.youtube.com/watch?v=DWmGArQBtFI" },
                    { 3, "Shoulder", "Medium", 5, "https://img.youtube.com/vi/1g6L2HkZz9Y/hqdefault.jpg", "Shoulder Strengthening Exercise", "https://www.youtube.com/watch?v=1g6L2HkZz9Y" },
                    { 4, "Shoulder", "Medium", 7, "https://img.youtube.com/vi/PPzD2w6pXyE/hqdefault.jpg", "Rotator Cuff Rehab Exercise", "https://www.youtube.com/watch?v=PPzD2w6pXyE" },
                    { 5, "Legs", "Hard", 6, "https://img.youtube.com/vi/Z8nQXn1pXyE/hqdefault.jpg", "Leg Balance Exercise", "https://www.youtube.com/watch?v=Z8nQXn1pXyE" },
                    { 6, "Legs", "Medium", 5, "https://img.youtube.com/vi/R1rYz6k2KpU/hqdefault.jpg", "Knee Stability Exercise", "https://www.youtube.com/watch?v=R1rYz6k2KpU" }
                });

            migrationBuilder.InsertData(
                table: "ClinicalFindings",
                columns: new[] { "Id", "CreatedOn", "DiagnosisId", "IsDeleted", "ModifiedOn", "Name", "Notes", "Value" },
                values: new object[,]
                {
                    { 1, null, 1, false, null, "Body Temperature", "Fever", "38.5°C" },
                    { 2, null, 1, false, null, "Oxygen Saturation", "Normal", "98%" },
                    { 3, null, 2, false, null, "Abdominal tenderness", "Epigastric area", "Present" },
                    { 4, null, 3, false, null, "Blood Pressure", "Elevated", "150/95 mmHg" },
                    { 5, null, 4, false, null, "HbA1c", "Above target", "7.1%" },
                    { 6, null, 4, false, null, "Fasting Blood Glucose", "Elevated", "140 mg/dL" }
                });

            migrationBuilder.InsertData(
                table: "Doctors",
                columns: new[] { "Id", "Address", "BirhDate", "DiagnosisPerDay", "ExperienceYears", "FName", "Gender", "IsDeleted", "LName", "LastResetDate", "ModifiedOn", "NationalId", "ProfileImageUrl", "Rating", "Specialization", "UserId" },
                values: new object[] { -1, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, 8, "Ahmed", null, false, "Mahmoud", new DateOnly(1, 1, 1), null, null, "", 4.7m, "Dermatology", "user-1" });

            migrationBuilder.InsertData(
                table: "Notifications",
                columns: new[] { "Id", "IsDeleted", "IsRead", "Message", "ModifiedOn", "NotificationType", "ReadAt", "RelatedId", "RelatedType", "Title", "UserId", "UserType" },
                values: new object[] { -1, false, false, "Your appointment is confirmed.", null, "Appointment", null, -1, "Appointment", "Appointment Confirmed", "user-2", "Patient" });

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "Id", "Address", "Allergies", "BloodType", "DateOfBirth", "FName", "Gender", "IsDeleted", "IsNewPatient", "IsUrgent", "LName", "ModifiedOn", "ProfileImageUrl", "UserId" },
                values: new object[] { -1, "Cairo", "None", "A+", new DateTime(1996, 6, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Sara", "Female", false, true, false, "Ali", null, "", "user-2" });

            migrationBuilder.InsertData(
                table: "SuggestedMedications",
                columns: new[] { "Id", "CreatedOn", "DiagnosisId", "Dosage", "Frequency", "IsDeleted", "ModifiedOn", "Name" },
                values: new object[,]
                {
                    { 1, null, 1, "500 mg", "Every 8 hours", false, null, "Paracetamol" },
                    { 2, null, 1, "10 mg", "Once daily", false, null, "Antihistamine" },
                    { 3, null, 2, "20 mg", "Once daily before meals", false, null, "Omeprazole" },
                    { 4, null, 2, "10 ml", "After meals", false, null, "Antacid" },
                    { 5, null, 3, "5 mg", "Once daily", false, null, "Amlodipine" },
                    { 6, null, 3, "-", "Low salt diet & exercise", false, null, "Lifestyle modification" },
                    { 7, null, 4, "500 mg", "Twice daily", false, null, "Metformin" }
                });

            migrationBuilder.InsertData(
                table: "Symptoms",
                columns: new[] { "Id", "CreatedOn", "DiagnosisId", "IsDeleted", "ModifiedOn", "Name" },
                values: new object[,]
                {
                    { 1, null, 1, false, null, "Fever" },
                    { 2, null, 1, false, null, "Cough" },
                    { 3, null, 1, false, null, "Sore throat" },
                    { 4, null, 1, false, null, "Runny nose" },
                    { 5, null, 1, false, null, "Body aches" },
                    { 6, null, 2, false, null, "Abdominal pain" },
                    { 7, null, 2, false, null, "Nausea" },
                    { 8, null, 2, false, null, "Vomiting" },
                    { 9, null, 2, false, null, "Bloating" },
                    { 10, null, 3, false, null, "Headache" },
                    { 11, null, 3, false, null, "Dizziness" },
                    { 12, null, 3, false, null, "Blurred vision" },
                    { 13, null, 4, false, null, "Fatigue" },
                    { 14, null, 4, false, null, "Frequent urination" }
                });

            migrationBuilder.InsertData(
                table: "Consultations",
                columns: new[] { "Id", "ConfidenceLevel", "Date", "Description", "DiagnosisName", "DoctorId", "FileUrls", "IsDeleted", "ModifiedOn", "Notes", "PatientId", "RejectNotes", "RejectReason", "Status", "Symptoms", "Type" },
                values: new object[] { 1, 0, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "General inquiry about symptoms", null, -1, null, false, null, "Patient reports symptoms for 3 days.", -1, null, null, "Pending", "Headache, fever, and fatigue.", "Inquiry" });

            migrationBuilder.InsertData(
                table: "Payments",
                columns: new[] { "Id", "Amount", "AppointmentId", "DoctorId", "IsDeleted", "ModifiedOn", "Notes", "PaymentDate", "PaymentMethod", "PaymentStatus" },
                values: new object[] { -1, 300m, -1, -1, false, null, "", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Cash", "Paid" });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ClinicalFindings_DiagnosisId",
                table: "ClinicalFindings",
                column: "DiagnosisId");

            migrationBuilder.CreateIndex(
                name: "IX_Consultations_DoctorId",
                table: "Consultations",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Consultations_PatientId",
                table: "Consultations",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_UserId",
                table: "Doctors",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalFiles_PatientId",
                table: "MedicalFiles",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "idx_created_at",
                table: "Notifications",
                column: "CreatedOn");

            migrationBuilder.CreateIndex(
                name: "idx_user_unread",
                table: "Notifications",
                columns: new[] { "UserId", "IsRead" });

            migrationBuilder.CreateIndex(
                name: "IX_Patients_UserId",
                table: "Patients",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "idx_payment_date",
                table: "Payments",
                column: "PaymentDate");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_DoctorId",
                table: "Payments",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_SuggestedMedications_DiagnosisId",
                table: "SuggestedMedications",
                column: "DiagnosisId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportTickets_DoctorId",
                table: "SupportTickets",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportTickets_PatientId",
                table: "SupportTickets",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportTickets_userId",
                table: "SupportTickets",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_Symptoms_DiagnosisId",
                table: "Symptoms",
                column: "DiagnosisId");

            migrationBuilder.CreateIndex(
                name: "IX_TreatmentPlans_DoctorId",
                table: "TreatmentPlans",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_TreatmentPlans_PatientId1",
                table: "TreatmentPlans",
                column: "PatientId1");

            migrationBuilder.CreateIndex(
                name: "IX_Usages_UserId",
                table: "Usages",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_UserSettings_UserId",
                table: "UserSettings",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "ClinicalFindings");

            migrationBuilder.DropTable(
                name: "Consultations");

            migrationBuilder.DropTable(
                name: "Faqs");

            migrationBuilder.DropTable(
                name: "MedicalFiles");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "PhysiotherapyExercises");

            migrationBuilder.DropTable(
                name: "Requests");

            migrationBuilder.DropTable(
                name: "SuggestedMedications");

            migrationBuilder.DropTable(
                name: "SupportTickets");

            migrationBuilder.DropTable(
                name: "Symptoms");

            migrationBuilder.DropTable(
                name: "TreatmentPlans");

            migrationBuilder.DropTable(
                name: "UsageConfig");

            migrationBuilder.DropTable(
                name: "Usages");

            migrationBuilder.DropTable(
                name: "UserSettings");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Doctors");

            migrationBuilder.DropTable(
                name: "Diagnosises");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
