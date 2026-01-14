using Diagnosis.Application.DTOs.Inquiry;
using Diagnosis.Application.DTOs.Settings;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.Services.FileService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.Settings
{
    public class GetProfileUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetProfileUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
         
        }
       public async Task<ProfileDto?> GetPatientProfile(string id, string role)
    {
        var user = await _unitOfWork.Profile.GetUserProfile(id);

        if (user == null)
        {
            return null;
        }
        if( role == "Doctor")
        {
            return new ProfileDto
            {
                FullName = $"{user.Doctor.FName} {user.Doctor.LName} ",
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
            };
        }
        else if (role == "Patient")
        {
            return new ProfileDto
            {
                FullName = $"{user.Patient.FName} {user.Patient.LName} ",
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
            };
        }

       return null;
    }
    }
}