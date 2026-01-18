using Diagnosis.Application.DTOs.Auth;
using Diagnosis.Application.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.Auth
{
        public class ChangePasswordUseCase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly ILogger<ChangePasswordUseCase> logger;

        public ChangePasswordUseCase(IUnitOfWork unitOfWork, ILogger<ChangePasswordUseCase> logger)
        {
            this.unitOfWork = unitOfWork;
            this.logger = logger;
        }

        public async Task<ChangePasswordResponse> ExecuteAsync(string userId, ChangePasswordDTO changePasswordDto)
        {
            try
            {
                // Verify user exists
                var user = await unitOfWork.Auth.GetUserByIdAsync(userId);
                if (user == null)
                {
                    return new ChangePasswordResponse
                    {
                        Success = false,
                        Message = "User not found",
                        Errors = new List<string> { "User not found" }
                    };
                }

                // Change password
                var result = await unitOfWork.Auth.ChangePasswordAsync(
                    userId,
                    changePasswordDto.CurrentPassword!,
                    changePasswordDto.NewPassword!
                );

                if (result.Succeeded)
                {
                   // await unitOfWork.CompleteAsync();

                    logger.LogInformation($"Password changed successfully for user {userId}");

                    return new ChangePasswordResponse
                    {
                        Success = true,
                        Message = "Password changed successfully"
                    };
                }

                // Handle errors
                var errors = result.Errors.Select(e => e.Description).ToList();
                logger.LogWarning($"Password change failed for user {userId}: {string.Join(", ", errors)}");

                return new ChangePasswordResponse
                {
                    Success = false,
                    Message = "Password change failed",
                    Errors = errors
                };
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error changing password for user {userId}");
                return new ChangePasswordResponse
                {
                    Success = false,
                    Message = "An error occurred while changing password",
                    Errors = new List<string> { ex.Message }
                };
            }
        }
    }
}
