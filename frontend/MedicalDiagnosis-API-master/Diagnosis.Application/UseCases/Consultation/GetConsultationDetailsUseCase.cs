using Diagnosis.Application.Interfaces;
using Diagnosis.Application.DTOs.Consultation;



namespace Diagnosis.Application.UseCases.Consultation
{
    public class GetConsultationDetailsUseCase  
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetConsultationDetailsUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<ConsultationDetailsDTO> GetConsultationDetails(int consultationId)
        {
            return await  _unitOfWork.Consultation.GetConsultationDetailsAsync(consultationId);
        }

    }
}