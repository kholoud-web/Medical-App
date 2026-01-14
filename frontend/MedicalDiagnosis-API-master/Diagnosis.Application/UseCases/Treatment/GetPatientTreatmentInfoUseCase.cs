using Diagnosis.Application.DTOs.Treatment;
using Diagnosis.Application.Interfaces;

namespace Diagnosis.Application.UseCases.Treatment
{
    public class GetPatientTreatmentInfoUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetPatientTreatmentInfoUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<PatientTreatmentInfoDto> ExecuteAsync(string patientId)
        {
            if (string.IsNullOrEmpty(patientId))
                throw new ArgumentException("Patient ID is required");

            var patientExists = await _unitOfWork.Treatment.PatientExistsAsync(patientId);
            if (!patientExists)
                throw new KeyNotFoundException("Patient not found");

            return await _unitOfWork.Treatment.GetPatientTreatmentInfoAsync(patientId);
        }
    }
}
