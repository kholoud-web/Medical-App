using Diagnosis.Application.DTOs.Consultation;
using Diagnosis.Application.DTOs.PatientDashboard;
using Diagnosis.Domain.Models.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Diagnosis.Application.Interfaces
{
    public interface IConsultationRepository : IRepository<Inquiry>
    {
        // 🔹 Dashboard support (NEW)
        IQueryable<Inquiry> GetQueryable();

        // 🔹 Existing methods (unchanged)
        Task<List<Inquiry>> GetByDoctorIdAsync(int doctorId);
        Task<List<Inquiry>> GetByPatientIdAsync(int patientId);
        Task<List<Inquiry>> GetByStatusAsync(ConsultationStatus status);
        Task<Inquiry?> GetDetailsAsync(int consultationId);
        Task<ConsultationDetailsDTO> GetConsultationDetailsAsync(int consultationId);
        Task<ConsultationResponseDTO> RejectConsultationAsync(RejectConsultationDTO rejectConsultationDTO, int consultationId);
        Task<ModifyConsultationDTO> GetModifyDataAsync(int consultationId);
        Task<ModifyConsultationResponseDTO> ModifyConsultationAsync(ModifyConsultationRequestDTO dto, int consultationId);
        Task<ConsultationResponseDTO> AcceptConsultationAsync(int consultationId);
        Task<int> GetDoctorAsync(string userId);
        Task<ConsultationResponseDTO> CancelConsultationAsync(int consultationId);
        Task<Dictionary<string, int>> GetConsultationCountByDayAsync(int patientId);
        Task<TopSymptomsDTO> GetTopSymptomsThisWeek(int patientId);
    }
}
