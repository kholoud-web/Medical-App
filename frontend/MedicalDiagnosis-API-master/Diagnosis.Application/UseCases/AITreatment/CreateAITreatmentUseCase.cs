using Diagnosis.Application.DTOs.Treatment;
using Diagnosis.Application.Interfaces;
using Diagnosis.Domain.Entites;
using Diagnosis.Domain.Models.Entites;
namespace Diagnosis.Application.UseCases
{
    public class CreateAITreatmentUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
       

        public CreateAITreatmentUseCase(
            IUnitOfWork unitOfWork)
            
        {
            _unitOfWork = unitOfWork;
           
        }

        public async Task<AITreatmentResponseDTO> ExecuteAsync(int DiagnosisId)
        {
            return await _unitOfWork.TreatmentProvider.CreateTreamentPlanAsync(DiagnosisId);
        }
    }
}
