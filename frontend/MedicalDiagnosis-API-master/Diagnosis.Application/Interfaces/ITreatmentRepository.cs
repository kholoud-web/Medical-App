using Diagnosis.Application.DTOs.Treatment;

namespace Diagnosis.Application.Interfaces
{
    public interface ITreatmentRepository
    {
        Task<PatientTreatmentInfoDto> GetPatientTreatmentInfoAsync(string patientId);
        Task<TreatmentPlanResponseDto> CreateTreatmentPlanAsync(CreateTreatmentPlanDto dto);
        Task<bool> PatientExistsAsync(string patientId);
    }
}
