using Diagnosis.Application.DTOs;
using Diagnosis.Application.DTOs.Treatment;
using Diagnosis.Application.UseCases;
using Diagnosis.Application.UseCases.Treatment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diagnosis.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TreatmentController : ControllerBase
    {
        [Authorize("Patient")]
        [HttpGet("ai-plan/{DiagnosisId}")]
        public async Task<IActionResult> CreateAITreatment(
            [FromRoute] int DiagnosisId,
            [FromServices] CreateAITreatmentUseCase createAITreatmentUseCase)
        {
            var result = await createAITreatmentUseCase.ExecuteAsync(DiagnosisId);

            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

    }

}

 
