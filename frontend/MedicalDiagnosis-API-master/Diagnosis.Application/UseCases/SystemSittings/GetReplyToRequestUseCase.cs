using Diagnosis.Application.DTOs.SystemSettings;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.SystemSittings
{
    public class GetReplyToRequestUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetReplyToRequestUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<SupportRequestResponseDTO> GetRequestaReplyAsync(int requestID)
        {
            return await _unitOfWork.systemSettings.GetRequestaReplyAsync(requestID);
        }
    }
}
