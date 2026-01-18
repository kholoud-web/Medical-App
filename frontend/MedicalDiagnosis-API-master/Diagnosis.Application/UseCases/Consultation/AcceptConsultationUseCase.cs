using Diagnosis.Application.Interfaces;
using Diagnosis.Application.DTOs.Consultation;



namespace Diagnosis.Application.UseCases.Consultation
{
    public class AcceptConsultationsUseCase 
    {
        private readonly IUnitOfWork _unitOfWork;

        public AcceptConsultationsUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
         public async Task<ConsultationResponseDTO> AcceptConsultation(int consultationId)
        {
            return await _unitOfWork.Consultation.AcceptConsultationAsync(consultationId);
        }
    }
}