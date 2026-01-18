using Diagnosis.Application.DTOs.SystemSettings;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.SystemSittings
{
    public class AddReplyToRequestUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AddReplyToRequestUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task ReplyToRequestAsync(SupportRequestDTO requestDTO)
        {
            await _unitOfWork.systemSettings.ReplyToRequestAsync(requestDTO);
        }
    }
}
