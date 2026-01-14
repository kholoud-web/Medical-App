using Diagnosis.Application.DTOs.DoctorDiagnosis;
using Diagnosis.Application.DTOs.DrugChecker;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.DoctorDiagnosis
{
    public class GetDoctorDiagnosisUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetDoctorDiagnosisUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        public async Task<DoctorDiagnosisResponse> ExecuteAsync(GetDoctorDiagnosisDTO diagnosisDTO, string userId)
        {
            var canUseAI = await _unitOfWork.systemSettings.CanUseAiAsync(userId);
            if (!canUseAI)
            {
                return new DoctorDiagnosisResponse
                {
                    Success = false,
                    Message = "You have reached the limit of using AI requests per day"
                };
            }
            return await _unitOfWork.DoctorDiagnosisProvider.GetDoctorDiagnosisAsync(diagnosisDTO);
        }
    }
}
