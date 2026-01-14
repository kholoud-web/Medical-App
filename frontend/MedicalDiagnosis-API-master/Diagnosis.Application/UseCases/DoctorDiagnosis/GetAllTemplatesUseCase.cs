using Diagnosis.Application.DTOs.DoctorDiagnosis;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.DoctorDiagnosis
{
    public class GetAllTemplatesUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAllTemplatesUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ICollection<TemplatesResponse>> ExecuteAsync()
        {
            return await _unitOfWork.DoctorDiagnosisProvider.GetTemplatesAsync();
        }
    }
}
