using Diagnosis.Application.DTOs.SystemSettings;
using Diagnosis.Application.UseCases.SystemSittings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Diagnosis.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    
    public class SystemSettingsController : ControllerBase
    {
        [HttpPost("add-admin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddAdmin(
            [FromBody] AddAdminDTO addAdminDTO,
            [FromServices] AddAdminUseCase addAdminUseCase
            )
        {
            var result = await addAdminUseCase.ExecuteAsync(addAdminDTO);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [HttpPost("send-message")]
        public async Task<IActionResult> SendContactMessage([FromBody]ContactMessageDTO contactMessageDTO , [FromServices] AddContactMessageUseCase addContactMessageUseCase)
        {
            await addContactMessageUseCase.SendContactMessage(contactMessageDTO);
            return Ok("Message Sent Successfully");
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("outside-requests")]
        public async Task<ActionResult<List<ContactMessageResponseDTO>>> GetContactMessageRequests([FromServices] GetContactMessageUseCase getContactMessageUseCase)
        {
            var requests = await getContactMessageUseCase.GetContactMessageRequests();
            return Ok(requests);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("send-reply")]
        public async Task<IActionResult> ReplyToRequestAsync([FromBody]SupportRequestDTO requestDTO , [FromServices] AddReplyToRequestUseCase addReplyToRequestUseCase)
        {
            await addReplyToRequestUseCase.ReplyToRequestAsync(requestDTO);
            return Ok("Reply Sent Successfully");
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("{requestID}/reply")]
        public async Task<ActionResult<SupportRequestResponseDTO>> GetRequestaReplyAsync([FromRoute]int requestID , [FromServices]GetReplyToRequestUseCase getReplyToRequestUseCase)
        {
            var result = await getReplyToRequestUseCase.GetRequestaReplyAsync(requestID);
            if (result == null)
                return NotFound("Reply Not Found");
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("ai/rate-limit")]
        public async Task<IActionResult> DefineMaxAiRequest(
            [FromBody] MaxRequestDTO maxRequestDTO,
            [FromServices] DefineMaxAiRequestUseCase maxAiRequestUseCase
            )
        {
            var result = await maxAiRequestUseCase.ExecuteAsync(maxRequestDTO);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("doctor/rate-limit")]
        public async Task<IActionResult> DefineMaxDoctorDiagnosis(
            [FromBody] MaxRequestDTO maxRequestDTO,
            [FromServices] DefineMaxDoctorDiagnosisUseCase maxDoctorDiagnosisUseCase
            )
        {
            var result = await maxDoctorDiagnosisUseCase.ExecuteAsync(maxRequestDTO);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("doctor/work-hours")]
        public async Task<IActionResult> UpdateDoctorWorkingHours(
            [FromBody] WorkHoursDTO maxRequestDTO,
            [FromServices] UpdateDoctorWorkHoursUseCase doctorWorkHoursUseCase
            )
        {
            var result = await doctorWorkHoursUseCase.ExecuteAsync(maxRequestDTO);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("ai/toggle")]
        public async Task<IActionResult> ToggleAi(
            [FromBody] EnableAiDTO enableAiDTO,
            [FromServices] ToggleAiUseCase toggleAiUseCase
            )
        {
            var result = await toggleAiUseCase.ExecuteAsync(enableAiDTO);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

    }
}
