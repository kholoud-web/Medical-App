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
    public class UpdateUserSettingsUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        public UpdateUserSettingsUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> ExecuteAsync(UpdateUserSettingsDTO dto, string userId)
        {
            var user = await _unitOfWork.Profile.GetUserProfile(userId);
            if (user == null) return false;

            user.ReceiveEmailNotifications = dto.ReceiveEmailNotifications;
            user.TwoFactorEnabled = dto.TwoFactorEnabled;

            return await _unitOfWork.Settings.UpdateUserSettings(user);
        }
    }
}