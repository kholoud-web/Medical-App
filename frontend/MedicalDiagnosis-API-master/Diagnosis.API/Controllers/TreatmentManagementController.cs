using Diagnosis.Application.DTOs.Treatment;
using Diagnosis.Application.UseCases.Treatment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diagnosis.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = "Doctor")]
    public class TreatmentManagementController : ControllerBase
    {
        private readonly GetPatientTreatmentInfoUseCase _getPatientInfoUseCase;
        private readonly CreateTreatmentPlanUseCase _createTreatmentPlanUseCase;

        public TreatmentManagementController(
            GetPatientTreatmentInfoUseCase getPatientInfoUseCase,
            CreateTreatmentPlanUseCase createTreatmentPlanUseCase)
        {
            _getPatientInfoUseCase = getPatientInfoUseCase;
            _createTreatmentPlanUseCase = createTreatmentPlanUseCase;
        }

        [HttpGet("patient/{patientId}")]
        public async Task<IActionResult> GetPatientTreatmentInfo(string patientId)
        {
            try
            {
                var result = await _getPatientInfoUseCase.ExecuteAsync(patientId);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("treatment-plan")]
        public async Task<IActionResult> CreateTreatmentPlan([FromBody] CreateTreatmentPlanDto dto)
        {
            try
            {
                var result = await _createTreatmentPlanUseCase.ExecuteAsync(dto);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
