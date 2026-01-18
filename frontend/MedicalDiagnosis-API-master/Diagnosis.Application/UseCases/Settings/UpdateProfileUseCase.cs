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
    public class UpdateProfileUseCase 
    {
        private readonly IUnitOfWork _unitOfWork;
        public UpdateProfileUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
         
        }
        public async Task<bool> UpdatePatientProfile(string id, ProfileDto profileDto, string role)
        {
            var user = await _unitOfWork.Profile.GetUserProfile(id);

            if (user == null)
            {
                return false;
            }

            if(role == "Doctor")
            {
                user.Doctor.FName = profileDto.FullName.Split(' ')[0];
                user.Doctor.LName = profileDto.FullName.Split(' ')[1];
                user.Email = profileDto.Email;
                user.PhoneNumber = profileDto.PhoneNumber;
                _unitOfWork.Profile.Update(user);

            }
            else if (role == "Patient")
            {
                user.Patient.FName = profileDto.FullName.Split(' ')[0];
                user.Patient.LName = profileDto.FullName.Split(' ')[1];
                user.Email = profileDto.Email;
                user.PhoneNumber = profileDto.PhoneNumber;

                _unitOfWork.Profile.Update(user);
            }

            await _unitOfWork.CompleteAsync();

            return true;
        }
    }
}