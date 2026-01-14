using Diagnosis.Application.Interfaces;
using Diagnosis.Application.DTOs.Consultation;



namespace Diagnosis.Application.UseCases.Consultation
{
    public class ModifyConsultationsUseCase 
    {
        private readonly IUnitOfWork _unitOfWork;

        public ModifyConsultationsUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<ModifyConsultationResponseDTO> ModifyConsultation(int consultationId, ModifyConsultationRequestDTO modifyConsultationRequestDTO)
        {
            return await _unitOfWork.Consultation.ModifyConsultationAsync(modifyConsultationRequestDTO, consultationId);
        }

    }
}