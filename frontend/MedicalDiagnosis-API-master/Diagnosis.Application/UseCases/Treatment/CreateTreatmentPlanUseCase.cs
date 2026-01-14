using Diagnosis.Application.DTOs.Treatment;
using Diagnosis.Application.Interfaces;

namespace Diagnosis.Application.UseCases.Treatment
{
    public class CreateTreatmentPlanUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateTreatmentPlanUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<TreatmentPlanResponseDto> ExecuteAsync(CreateTreatmentPlanDto dto)
        {
            var patientExists = await _unitOfWork.Treatment.PatientExistsAsync(dto.PatientId);
            if (!patientExists)
                throw new KeyNotFoundException("Patient not found");

            return await _unitOfWork.Treatment.CreateTreatmentPlanAsync(dto);
        }
    }
}
