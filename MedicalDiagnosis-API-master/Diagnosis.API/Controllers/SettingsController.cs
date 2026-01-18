using Diagnosis.Application.Services.EmailService;
using Diagnosis.Application.UseCases;
using Diagnosis.Domain.Models.Entites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.WebUtilities;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.DTOs.DrugChecker;
using Diagnosis.Application.UseCases.DrugChecker;
using Diagnosis.Application.UseCases.Settings;
using Diagnosis.Application.DTOs.Settings;

namespace Diagnosis.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class SettingsController : ControllerBase
    {
        
        [HttpGet("profile")]
         
        public async Task<IActionResult> GetProfile(
            [FromServices] GetProfileUseCase getProfileUseCase)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Console.WriteLine("User ID: " + userId);

            if (userId == null)
                return Unauthorized();
            var role = User.FindFirstValue(ClaimTypes.Role);

            var profile = await getProfileUseCase.GetPatientProfile(userId, role);

            if (profile == null)
                return NotFound(new { message = "Profile not found" });

            return Ok(profile);
        }
   
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile(
            [FromServices] UpdateProfileUseCase updateProfileUseCase,
            [FromBody] ProfileDto ProfileDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                return Unauthorized();

            var role = User.FindFirstValue(ClaimTypes.Role);

            var result = await updateProfileUseCase.UpdatePatientProfile(userId, ProfileDto, role);

            if (!result)
                return NotFound(new { message = "Profile not found or update failed" });

            return NoContent();
        }
        [HttpGet("user-settings")]
        public async Task<IActionResult> GetUserSettings(
            [FromServices] GetUserSettingsUseCase getUserSettingsUseCase)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var role = User.FindFirstValue(ClaimTypes.Role);

            if (userId == null)
                return Unauthorized();

            var settings = await getUserSettingsUseCase.GetUserSettings(userId, role);

            if (settings == null)
                return NotFound(new { message = "User settings not found" });

            return Ok(settings);
        }
        [HttpPut("user-settings")]
        public async Task<IActionResult> UpdateUserSettings(
            [FromServices] UpdateUserSettingsUseCase updateUserSettingsUseCase,
            [FromBody] UpdateUserSettingsDTO updateUserSettingsDTO)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var role = User.FindFirstValue(ClaimTypes.Role);

            if (userId == null)
                return Unauthorized();

            var result = await updateUserSettingsUseCase.ExecuteAsync(updateUserSettingsDTO, userId);

            if (!result)
                return NotFound(new { message = "User settings not found or update failed" });

            return NoContent();
        }
    }
}