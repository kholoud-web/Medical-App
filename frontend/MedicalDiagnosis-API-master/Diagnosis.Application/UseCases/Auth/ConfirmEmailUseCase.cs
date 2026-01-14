using Diagnosis.Application.DTOs.Auth;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases
{
    public class ConfirmEmailUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ConfirmEmailUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<RegisterResponse> ExcuteAsync(ConfirmEmailDTO confirmEmailDTO)
        {
            return await _unitOfWork.Auth.ConfirmEmailAsync(confirmEmailDTO);
        }
    }
}
