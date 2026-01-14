using Diagnosis.Application.Interfaces;
using Diagnosis.Application.DTOs.Consultation;



namespace Diagnosis.Application.UseCases.Consultation
{
    public class RejectConsultationsUseCase 
    {
        private readonly IUnitOfWork _unitOfWork;

        public RejectConsultationsUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ConsultationResponseDTO> RejectConsultation(int consultationId, RejectConsultationDTO rejectConsultationDTO)
        {
            return await _unitOfWork.Consultation.RejectConsultationAsync(rejectConsultationDTO, consultationId);
        }
    }
}