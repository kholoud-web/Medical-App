using Diagnosis.Application.DTOs.DiagnosisModule;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.DiagnosisModule
{
    public class CreateDiagnosisUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateDiagnosisUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BoneFractionResponseDTO> ExecuteAsync(CreateDiagnosisDTO createDiagnosisDTO, string userId)
        {
            
            return await _unitOfWork.DiagnosisModule.CreateDiagnosisAsync(createDiagnosisDTO, userId);
        }
    }
}
