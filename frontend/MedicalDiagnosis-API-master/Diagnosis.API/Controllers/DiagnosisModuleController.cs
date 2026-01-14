using Diagnosis.API.Attributes;
using Diagnosis.Application.DTOs.DiagnosisModule;
using Diagnosis.Application.UseCases.DiagnosisModule;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Diagnosis.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DiagnosisModuleController : ControllerBase
    {
        [Authorize(Roles = "Patient")]
        [AiEndpoint]
        [HttpPost("create-daignosis")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateDiagnosis(
            [FromServices] CreateDiagnosisUseCase createDiagnosisUseCase,
            [FromForm] CreateDiagnosisDTO createDiagnosisDTO)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!.ToString();
            var result = await createDiagnosisUseCase.ExecuteAsync(createDiagnosisDTO, userId);

            if (!result.Success)
            {
                return BadRequest(new {result.Success, result.Message});
            }
            return Ok(result);
        }
    }
}
