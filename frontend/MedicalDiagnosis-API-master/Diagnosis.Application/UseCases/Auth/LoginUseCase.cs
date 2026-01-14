using Diagnosis.Application.DTOs.Auth;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Diagnosis.Application.UseCases.Auth
{
    public class LoginUseCase
    {
         
         private readonly IUnitOfWork _unitOfWork;

        public LoginUseCase(IUnitOfWork unitOfWork)
        {
           
            _unitOfWork = unitOfWork;
        

        }

        public async Task<LoginResponseDTO> Login(LoginDTO loginDTO)
        {
            return await _unitOfWork.Auth.LoginAsync(loginDTO.Email, loginDTO.Password, loginDTO.ClientUri);

           
            
        }
    }
}