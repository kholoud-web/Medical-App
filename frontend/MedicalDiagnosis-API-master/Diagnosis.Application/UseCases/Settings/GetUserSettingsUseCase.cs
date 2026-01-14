using Diagnosis.Application.DTOs.Inquiry;
using Diagnosis.Application.DTOs.Settings;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.Services.FileService;
using Microsoft.EntityFrameworkCore.Storage.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.Settings
{
    public class GetUserSettingsUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetUserSettingsUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
         
        }
       public async Task<SettingsDto> GetUserSettings(string id, string role)
    {
        Console.WriteLine($"Fetching user settings for user ID: {id}");
        var user = await _unitOfWork.Profile.GetUserProfile(id);
        if (user == null) return null;
        if (role == "Patient"){
        return new SettingsDto
        {
            ReceiveEmailNotifications = user.ReceiveEmailNotifications,
            TwoFactorEnabled = user.TwoFactorEnabled,
            ProfilePictureUrl = user.Patient.ProfileImageUrl
        };}
        else if (role == "Doctor"){
            return new SettingsDto
        {
            ReceiveEmailNotifications = user.ReceiveEmailNotifications,
            TwoFactorEnabled = user.TwoFactorEnabled,
            ProfilePictureUrl = user.Doctor.ProfileImageUrl
        };
        }  
         return null; 
    }

    }


    }
