using Diagnosis.Application.DTOs.SystemSettings;
using Diagnosis.Domain.Models.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.Interfaces
{
    public interface ISystemSettingsRepository: IRepository<UserAIUsage>
    {
        Task<bool> CanUseAiAsync(string userId);
        Task<UsageResponse> DefineMaxAIRequestPerDay(MaxRequestDTO maxRequestDTO);
        Task<UsageResponse> ToggleAiAsync(EnableAiDTO enableAiDTO);
        Task<bool> CanMakeDiagnosisAsync(string userId);
        Task<UsageResponse> DefineMaxDoctorDiagnosisPerDay(MaxRequestDTO maxRequestDTO);
        Task<bool> IsAiEnabledAsync();
        Task SendContactMessage(ContactMessageDTO contactMessageDTO);
        Task<List<ContactMessageResponseDTO>> GetContactMessageRequests();
        Task ReplyToRequestAsync(SupportRequestDTO requestDTO);
        Task<SupportRequestResponseDTO> GetRequestaReplyAsync(int requestID);
        Task<UsageResponse> UpdateDoctorWorkHoursAsync(WorkHoursDTO maxRequestDTO);
    }
}
