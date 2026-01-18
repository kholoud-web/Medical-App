using Diagnosis.Application.DTOs.DoctorDiagnosis;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.DoctorDiagnosis
{
    public class GetTemplateUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetTemplateUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        public async Task<DoctorDiagnosisResponse> ExecuteAsync(int templateId)
        {
            return await _unitOfWork.DoctorDiagnosisProvider.GetTemplateAsync(templateId);
        }
    }
}
