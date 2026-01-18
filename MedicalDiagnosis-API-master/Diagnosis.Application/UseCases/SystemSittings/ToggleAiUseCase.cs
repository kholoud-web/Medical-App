using Diagnosis.Application.DTOs.SystemSettings;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.SystemSittings
{
    public class ToggleAiUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ToggleAiUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<UsageResponse> ExecuteAsync(EnableAiDTO enableAiDTO)
        {
            return await _unitOfWork.systemSettings.ToggleAiAsync(enableAiDTO);
        }
    }
}
