using Azure.Core;
using Diagnosis.Application.DTOs.SystemSettings;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.Services.EmailService;
using Diagnosis.Domain.Models.Entites;
using Microsoft.EntityFrameworkCore;
using NETCore.MailKit.Core;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Request = Diagnosis.Domain.Models.Entites.Request;

namespace Diagnosis.Infrastracture.Repositories
{
    public class SystemSettingsRepository : Repository<UserAIUsage>, ISystemSettingsRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailSender _emailsender;

        public SystemSettingsRepository(
            ApplicationDbContext context, 
            IEmailSender emailsender
            ):base(context)
        {
            _context = context;
            _emailsender = emailsender;
        }

        public async Task<List<ContactMessageResponseDTO>> GetContactMessageRequests()
        {
            var requests = await _context.Requests
                .ToListAsync();

            var contactResponses = new List<ContactMessageResponseDTO>();
            foreach (var request in requests)
            {
                if (request.Status == RequestStatus.Replied)
                {
                    contactResponses.Add(
                         new ContactMessageResponseDTO()
                         {
                             FullName = request.Name,
                             Email = request.Email,
                             Message = request.Message,
                             Status = "Replied"
                         });
                }
                else
                {
                    contactResponses.Add(
                         new ContactMessageResponseDTO()
                         {
                             FullName = request.Name,
                             Email = request.Email,
                             Message = request.Message,
                             Status = "Pending"
                         });
                }
            }
            return contactResponses;
        }


        public async Task SendContactMessage(ContactMessageDTO contactMessageDTO)
        {
            var request = new Request
            {
                Name = contactMessageDTO.FullName,
                Email = contactMessageDTO.Email,
                Message = contactMessageDTO.Message,
                
            };
            await _context.AddAsync(request);

            await _context.SaveChangesAsync();
        }
        public async Task ReplyToRequestAsync(SupportRequestDTO requestDTO)
        {
            var request = await _context.Requests
                .FirstOrDefaultAsync(x => x.Id == requestDTO.RequestId);

            if (request == null)
                throw new Exception("Request not found");

            request.Reply = requestDTO.Reply;
            request.Status = RequestStatus.Replied;

            await _context.SaveChangesAsync();

            var assembly = Assembly.Load("Diagnosis.Application");
            using var stream = assembly.GetManifestResourceStream("Diagnosis.Application.Template.ContactEmail.html");

            if (stream == null) throw new Exception("stream file of Email template is not correct");

            using var reader = new StreamReader(stream);
            var htmlTemplate = await reader.ReadToEndAsync();

            var html = (htmlTemplate.Replace("{{Name}}", request.Name)).Replace("{{AdminReply}}", request.Reply);

            var message = new Message(
                new[] { request.Email! },
                "Reply to your request",
                html
                );

            await _emailsender.SendEmailAsync(message);
        }

        public async Task<SupportRequestResponseDTO> GetRequestaReplyAsync(int requestID)
        {
            var request = await _context.Requests
               .FirstOrDefaultAsync(x => x.Id == requestID);

            if (request == null)
                throw new Exception("Request not found");

            return new SupportRequestResponseDTO
            {
                RequestId = requestID,
                Reply = request.Reply,
                Status = request.Status
            };
        }
   
        

        public async Task<bool> CanUseAiAsync(string userId)
        {
            var maxRequest = await _context.UsageConfig.FirstOrDefaultAsync();
            if (maxRequest == null) throw new NullReferenceException("Must assign max requests" + nameof(maxRequest));

            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var userUsage = await _context.Usages.FirstOrDefaultAsync(x => x.UserId == userId);

            if (userUsage == null)
            {
                userUsage = new UserAIUsage
                {
                    UserId = userId,
                    UsedRequestsToday = 0,
                    LastResetDate = today
                };

                await _context.Usages.AddAsync(userUsage);
            }

            if (userUsage!.LastResetDate != today)
            {
                userUsage.UsedRequestsToday = 0;
                userUsage.LastResetDate = today;
            }

            if (userUsage!.UsedRequestsToday >= maxRequest.MaxRequestsPerDay)
            {
                return false;
            }

            userUsage.UsedRequestsToday++;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<UsageResponse> DefineMaxAIRequestPerDay(MaxRequestDTO maxRequestDTO)
        {
            if (maxRequestDTO.maxRequestsPerDay == 0)
            {
                return new UsageResponse
                {
                    Success = false,
                    Message = "Must enter value above 0"
                };
            }
            var maxRequest = await _context.UsageConfig.FirstOrDefaultAsync();
            maxRequest!.MaxRequestsPerDay = maxRequestDTO.maxRequestsPerDay;
            return new UsageResponse
            {
                Success = true,
                Message = "Max Requsts per day for AI Dianosis usage has been updated successfully"
            };
        }

        public async Task<bool> CanMakeDiagnosisAsync(string userId)
        {
            var maxDiagnosis = await _context.UsageConfig.FirstOrDefaultAsync();
            if (maxDiagnosis == null) throw new NullReferenceException("Must assign max requests" + nameof(maxDiagnosis));

            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var doctor = await _context.Doctors.FirstOrDefaultAsync(x => x.UserId == userId);


            if (doctor!.LastResetDate != today)
            {
                doctor.DiagnosisPerDay = 0;
                doctor.LastResetDate = today;
            }

            if (doctor!.DiagnosisPerDay >= maxDiagnosis.MaxDiagnosisPerDay)
            {
                return false;
            }

            doctor.DiagnosisPerDay++;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<UsageResponse> DefineMaxDoctorDiagnosisPerDay(MaxRequestDTO maxRequestDTO)
        {
            if (maxRequestDTO.maxRequestsPerDay == 0)
            {
                return new UsageResponse
                {
                    Success = false,
                    Message = "Must enter value above 0"
                };
            }
            var maxRequest = await _context.UsageConfig.FirstOrDefaultAsync();
            maxRequest!.MaxDiagnosisPerDay = maxRequestDTO.maxRequestsPerDay;
            return new UsageResponse
            {
                Success = true,
                Message = "Max Diagnosis per day for doctor has been updated successfully"
            };
        }

        public async Task<bool> IsAiEnabledAsync()
        {
            var enabled = await _context.UsageConfig.FirstOrDefaultAsync();
            if(enabled!.AiEnabled)
            {
                return true;
            }
            return false;
        }

        public async Task<UsageResponse> ToggleAiAsync(EnableAiDTO enableAiDTO)
        {
            if (string.IsNullOrEmpty(enableAiDTO.Enabled.ToString()))
            {
                return new UsageResponse
                {
                    Success = false,
                    Message = "Must enter true or false"
                };
            }

            var enabled = await _context.UsageConfig.FirstOrDefaultAsync();
            enabled!.AiEnabled = enableAiDTO.Enabled;
            await _context.SaveChangesAsync();
            return new UsageResponse
            {
                Success = true,
                Message = "AI services status changed successfully"
            };
        }

        public async Task<UsageResponse> UpdateDoctorWorkHoursAsync(WorkHoursDTO maxRequestDTO)
        {
            if (maxRequestDTO.Hours == 0)
            {
                return new UsageResponse
                {
                    Success = false,
                    Message  = "Hours must be above 0"
                };
            }
            var workHours = await _context.UsageConfig.FirstOrDefaultAsync();
            workHours!.WorkHoursPweDoctor = maxRequestDTO.Hours;

            return new UsageResponse
            {
                Success = true,
                Message = "Work hours per doctor has been updated successfully"
            };
        }
    }
}
