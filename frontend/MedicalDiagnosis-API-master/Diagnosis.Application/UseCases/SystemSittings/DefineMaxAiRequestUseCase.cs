using Diagnosis.Application.DTOs.SystemSettings;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.SystemSittings
{
    public class DefineMaxAiRequestUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public DefineMaxAiRequestUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<UsageResponse> ExecuteAsync(MaxRequestDTO maxRequestDTO)
        {
            return await _unitOfWork.systemSettings.DefineMaxAIRequestPerDay(maxRequestDTO);
        }
    }
}
