
using Diagnosis.API.Middleware;
using Diagnosis.API.Middlewares;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.Services.EmailService;
using Diagnosis.Application.Services.FileService;
using Diagnosis.Application.UseCases;
using Diagnosis.Application.UseCases.Auth;
using Diagnosis.Application.UseCases.Consultation;
using Diagnosis.Application.UseCases.DoctorDiagnosis;
using Diagnosis.Application.UseCases.DrugChecker;
using Diagnosis.Application.UseCases.Faq;
using Diagnosis.Application.UseCases.Inquiry;
using Diagnosis.Application.UseCases.MedicalFiles;
using Diagnosis.Application.UseCases.SupportTicket;
using Diagnosis.Application.UseCases.SystemSittings;
using Diagnosis.Application.UseCases.Treatment;
using Diagnosis.Domain.Models.Entites;
using Diagnosis.Infrastracture.Identity;
using Diagnosis.Infrastracture.Providers;

using Diagnosis.Application.UseCases.Settings;

using Diagnosis.Infrastracture.Repositories;
using Diagnosis.Infrastructure.Providers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using System.Text;
using System.Threading.Tasks;
using Diagnosis.Application.UseCases.PhysiotherapyExercise;
using Diagnosis.Application.UseCases.PatientDashboard;
using Diagnosis.Application.UseCases.DiagnosisModule;




namespace Diagnosis.API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var connectionString = builder.Configuration.GetConnectionString("Diagnosis");
            var emailConfig = builder.Configuration.GetSection("EmailConfiguration")
                .Get<EmailConfiguration>();
            builder.Services.AddSingleton(emailConfig);
            builder.Services.AddScoped<IEmailSender, EmailSender>();
            builder.Services.AddScoped<IFileService, FileService>();
            builder.Services.Configure<FormOptions>(O =>
            {
                O.ValueLengthLimit = int.MaxValue;
                O.MultipartBodyLengthLimit = int.MaxValue;
                O.MemoryBufferThreshold = int.MaxValue;
            });

              builder.Configuration.GetConnectionString("Diagnosis");
              builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString));

            builder.Services.AddDataProtection();

            builder.Services.AddScoped<ChangePasswordUseCase>();
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<RegisterUseCase>();
            builder.Services.AddScoped<LoginUseCase>();
            builder.Services.AddScoped<ForgotPasswordUseCase>();
            builder.Services.AddScoped<ResetPasswordUseCase>();
            builder.Services.AddScoped<ConfirmEmailUseCase>();
            builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
            builder.Services.AddScoped<GetDoctorConsultationsUseCase>();
            builder.Services.AddScoped<GetConsultationDetailsUseCase>();
            builder.Services.AddScoped<GetModifyConsultationDataUseCase>();
            builder.Services.AddScoped<ModifyConsultationsUseCase>();
            builder.Services.AddScoped<RejectConsultationsUseCase>();
            builder.Services.AddScoped<CancelConsultationUseCase>();
            builder.Services.AddScoped<AcceptConsultationsUseCase>();
            builder.Services.AddScoped<DrugCheckerUseCase>();
            builder.Services.AddScoped<DrugSuggestionUseCase>();
            builder.Services.AddScoped<AddInquiryUseCase>();
            builder.Services.AddScoped<GetInquiriesUseCase>();
            builder.Services.AddScoped<GetInquiryUseCase>();
            builder.Services.AddScoped<CreateAITreatmentUseCase>();
            builder.Services.AddScoped<GetProfileUseCase>();
            builder.Services.AddScoped<UpdateProfileUseCase>();
            builder.Services.AddScoped<GetUserSettingsUseCase>();
            builder.Services.AddScoped<UpdateUserSettingsUseCase>();
            builder.Services.AddScoped<GetPhysiotherapyExerciseUseCase>();
            builder.Services.AddScoped<GetRecentInquiriesUseCase>();
            builder.Services.AddScoped<GetPendingInquiriesCountUseCase>();
            builder.Services.AddScoped<GetConsultationCountThisWeekUseCase>();
            builder.Services.AddScoped<GetTopSymptomsThisWeekUseCase>();

            builder.Services.AddScoped<GetPatientTreatmentInfoUseCase>();
            builder.Services.AddScoped<CreateTreatmentPlanUseCase>();

            builder.Services.AddScoped<CreateDiagnosisUseCase>();

            builder.Services.AddScoped<GetTemplateUseCase>();
            builder.Services.AddScoped<GetAllTemplatesUseCase>();
            builder.Services.AddScoped<GetDoctorDiagnosisUseCase>();
            builder.Services.AddScoped<AddDoctorUseCase>();
            builder.Services.AddScoped<AddAdminUseCase>();
            builder.Services.AddScoped<AddSupportTicketUseCase>();
            builder.Services.AddScoped<GetSupportTicketsUseCase>();
            builder.Services.AddScoped<GetFaqsUseCase>();
            builder.Services.AddScoped<IFaq , FaqRepository>();
            builder.Services.AddScoped<ISupportTicket, SupportTicketRepository>();
            builder.Services.AddScoped<AddFileUseCase>();
            builder.Services.AddScoped<GetFileUseCase>();
            builder.Services.AddScoped<GetFilesForPatientUseCase>();
            builder.Services.AddScoped<DeleteFileUseCase>();
            builder.Services.AddScoped<AddSuportTicketReplyUseCase>();
            builder.Services.AddScoped<GetSuportTicketReplyUseCase>();
            builder.Services.AddScoped<AddContactMessageUseCase>();
            builder.Services.AddScoped<GetContactMessageUseCase>();
            builder.Services.AddScoped<AddReplyToRequestUseCase>();
            builder.Services.AddScoped<GetReplyToRequestUseCase>();
            builder.Services.AddScoped<DefineMaxAiRequestUseCase>();
            builder.Services.AddScoped<DefineMaxDoctorDiagnosisUseCase>();
            builder.Services.AddScoped<ToggleAiUseCase>();
            builder.Services.AddScoped<UpdateDoctorWorkHoursUseCase>();
            builder.Services.AddScoped<GetSupportTicketContentUseCase>();



            builder.Services.AddHttpClient<IDrugCheckerProvider, DrugCheckerProvider>(client =>
            {
                client.BaseAddress = new Uri(builder.Configuration["AiModule:BaseUrl"]!);
            });

            builder.Services.AddHttpClient<IDiagnosisModuleProvider, DiagnosisModuleProvider>(client =>
            {
                client.BaseAddress = new Uri(builder.Configuration["BoneFracture:BaseUrl"]!);
            });

            builder.Services.AddHttpClient<ITreatmentProvider, TreatmentProvider>(client =>
            {
                client.BaseAddress = new Uri(builder.Configuration["AiModule:BaseUrl"]!);
            });

            builder.Services.AddHttpClient<IDoctorDiagnosisProvider, DoctorDiagnosisProvider>(client =>
            {
                client.BaseAddress = new Uri(builder.Configuration["AiModule:BaseUrl"]!);
            });


            /////
            ///// ====== Profiles (Today Work) ======

            // Doctor & Patient repositories

            builder.Services.AddScoped<IPatientManagement, PatientRepository>(); 
            builder.Services.AddScoped<IDoctorManagement, DoctorRepository>();



            builder.Services.AddIdentityCore<ApplicationUser>(options =>
            {
                options.User.RequireUniqueEmail = true;
                options.SignIn.RequireConfirmedEmail = true;

                // Password settings 
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;

                // Lockout settings 
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
            })
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            builder.Services.Configure<DataProtectionTokenProviderOptions>(opt => 
            opt.TokenLifespan = TimeSpan.FromHours(2));

            builder.Services.AddAuthentication("Bearer")
            .AddJwtBearer(options =>
            {
                var jwtConfig = builder.Configuration.GetSection("Jwt");

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtConfig["Issuer"],
                    ValidAudience = jwtConfig["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtConfig["Key"])
                    )
                };
            });
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy",policy =>
                    policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            });
           

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.MapScalarApiReference();
            }

            app.UseMiddleware<GlobalExceptionHandlingMiddleware>();
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors("MyPolicy");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseMiddleware<AiEnablingMiddleware>();
            app.MapControllers();

            using (var scope = app.Services.CreateScope())
            {
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                await IdentitySeeder.SeedRoles(roleManager);
            }

            app.Run();
        }
    }
}
