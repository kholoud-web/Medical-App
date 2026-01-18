using Diagnosis.Application.DTOs.Auth;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.Auth
{
    public class ForgotPasswordUseCase
    {
        private readonly IUnitOfWork unitOfWork;

        public ForgotPasswordUseCase(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public async Task<ForgotPasswordResponseDTO> ForgotPasswordAsync(ForgotPasswordDTO forgotPasswordDTO)
        {
            return await unitOfWork.Auth.ForgotPasswordAsync(forgotPasswordDTO);
        }
    }
}
