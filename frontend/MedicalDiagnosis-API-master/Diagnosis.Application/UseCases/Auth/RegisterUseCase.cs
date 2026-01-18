using Diagnosis.Application.DTOs.Auth;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Diagnosis.Application.UseCases.Auth
{
    public class RegisterUseCase
    {
        private readonly IUnitOfWork unitOfWork;

        public RegisterUseCase(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<RegisterResponse> ExcuteAsync(RegisterDTO registerDTO)
        {             
            return await unitOfWork.Auth.RegisterAsync(registerDTO); ;
        }

    }
}
