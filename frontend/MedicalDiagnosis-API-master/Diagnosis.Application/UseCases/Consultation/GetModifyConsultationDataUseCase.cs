using Diagnosis.Application.Interfaces;
using Diagnosis.Application.DTOs.Consultation;



namespace Diagnosis.Application.UseCases.Consultation
{
    public class GetModifyConsultationDataUseCase 
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetModifyConsultationDataUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<ModifyConsultationDTO> GetModifyConsultationData(int consultationId)
        {
            return await _unitOfWork.Consultation.GetModifyDataAsync(consultationId);

    }
}
}
   