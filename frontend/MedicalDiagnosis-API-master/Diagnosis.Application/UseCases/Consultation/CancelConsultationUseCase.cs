using Diagnosis.Application.Interfaces;
using Diagnosis.Application.DTOs.Consultation;



namespace Diagnosis.Application.UseCases.Consultation
{
    public class CancelConsultationUseCase 
    {
        private readonly IUnitOfWork _unitOfWork;

        public CancelConsultationUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ConsultationResponseDTO> CancelConsultation(int consultationId)
        {
            return await _unitOfWork.Consultation.CancelConsultationAsync(consultationId);
        }
    }
}

