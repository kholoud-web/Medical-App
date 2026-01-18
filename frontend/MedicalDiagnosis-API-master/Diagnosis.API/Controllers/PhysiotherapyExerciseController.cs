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
using Diagnosis.Application.UseCases.PhysiotherapyExercise;

namespace Diagnosis.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PhysiotherapyExerciseController : ControllerBase
    {
        [Authorize(Roles ="Patient")]
        [HttpGet("list")]
        public async Task<IActionResult> GetAllPhysiotherapyExercises(
            [FromServices] GetPhysiotherapyExerciseUseCase getPhysiotherapyExerciseUseCase)
        {
            var exercises = await getPhysiotherapyExerciseUseCase.GetAllExercises();

            if (exercises == null || !exercises.Any())
                return NotFound(new { message = "No exercises found" });

            return Ok(exercises);
        }
    }
}