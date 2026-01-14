using Diagnosis.API.Attributes;
using Diagnosis.Application.DTOs.Consultation;
using Diagnosis.Application.Services.EmailService;
using Diagnosis.Application.UseCases.Consultation;
using Diagnosis.Domain.Models.Entites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Security.Claims;
using Diagnosis.Application.DTOs.Consultation;
using Diagnosis.Application.UseCases.Consultation;
using Diagnosis.Application.UseCases.PatientDashboard;

namespace Diagnosis.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ConsultationController : ControllerBase
    {
       
        [Authorize(Roles = "Doctor")]
        [HttpGet("all")]
        public async Task<IActionResult> GetConsultationsByDoctorId(
            [FromServices] GetDoctorConsultationsUseCase _getDoctorConsultationsUseCase
            )
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!.ToString();
            var consultations = await _getDoctorConsultationsUseCase.GetDoctorConsultations(userId);
            return Ok(consultations);
        }

       [Authorize(Roles = "Doctor")]
       [HttpPost("reject/{consultationId}")]
       public async Task<IActionResult> RejectConsultation(
           [FromBody] RejectConsultationDTO rejectConsultationDTO,
              [FromRoute] int consultationId,
              [FromServices] RejectConsultationsUseCase _rejectConsultationUseCase)
       {
           var result = await _rejectConsultationUseCase.RejectConsultation(consultationId, rejectConsultationDTO);
           if (!result.Success)
               return BadRequest(result.ErrorMessage);

           return Ok(result);
       }
       [Authorize(Roles = "Doctor")]
       [HttpPost("modify/{consultationId}")]
       [Diagnosis]
        public async Task<IActionResult> ModifyConsultation(
           [FromBody] ModifyConsultationRequestDTO modifyConsultationDTO,
           [FromRoute] int consultationId,
           [FromServices] ModifyConsultationsUseCase _modifyConsultationUseCase)
       {
           var result = await _modifyConsultationUseCase.ModifyConsultation(consultationId, modifyConsultationDTO);
           if (!result.Success)
               return BadRequest(result.ErrorMessage);

           return Ok(result);

       }       
       [Authorize(Roles = "Doctor")]
       [HttpGet("details/{consultationId}")]
       public async Task<IActionResult> GetConsultationDetails(
           [FromRoute] int consultationId,
           [FromServices] GetConsultationDetailsUseCase _getConsultationDetailsUseCase)
       {
           var result = await _getConsultationDetailsUseCase.GetConsultationDetails(consultationId);
           if (!result.Success)
               return BadRequest(result.ErrorMessage);

           return Ok(result);
       }
       [Authorize(Roles = "Doctor")]
       [HttpPost("accept/{consultationId}")]
       public async Task<IActionResult> AcceptConsultation(
           [FromRoute] int consultationId,
           [FromServices] AcceptConsultationsUseCase _acceptConsultationUseCase)
       {
          var result = await _acceptConsultationUseCase.AcceptConsultation(consultationId);
           if (!result.Success)
               return BadRequest(result.ErrorMessage);

           return Ok(result);
       }
       //get modify data
       [Authorize(Roles = "Doctor")]
       [HttpGet("modify-data/{consultationId}")]
       public async Task<IActionResult> GetModifyData(
           [FromRoute] int consultationId,
           [FromServices] GetModifyConsultationDataUseCase _getModifyConsultationDataUseCase)
       {
           var result = await _getModifyConsultationDataUseCase.GetModifyConsultationData(consultationId);
           if (!result.Success)
               return BadRequest(result.ErrorMessage);

           return Ok(result);
       }
       [Authorize(Roles = "Patient")]
       [HttpPost("cancel/{consultationId}")]
       public async Task<IActionResult> CancelConsultation(
           [FromRoute] int consultationId,
           [FromServices] CancelConsultationUseCase _cancelConsultationUseCase)
       {
           var result = await _cancelConsultationUseCase.CancelConsultation(consultationId);
           if (!result.Success)
               return BadRequest(result.ErrorMessage);

           return Ok(result);
       }

       [Authorize(Roles = "Patient")]
       [HttpGet("symptom-count-this-week")]
       public async Task<IActionResult> GetConsultationCountThisWeek(
           [FromServices] GetConsultationCountThisWeekUseCase _getConsultationCountThisWeekUseCase)
       {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!.ToString();

            var result = await _getConsultationCountThisWeekUseCase.ExecuteAsync(userId);
           
           return Ok(result);
       }
       [Authorize(Roles = "Patient")]
       [HttpGet("top-symptoms-this-week")]
       public async Task<IActionResult> GetTopSymptomsThisWeek(
           [FromServices] GetTopSymptomsThisWeekUseCase _getTopSymptomsThisWeekUseCase)
       {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!.ToString();

            var result = await _getTopSymptomsThisWeekUseCase.ExecuteAsync(userId);
           

           return Ok(result);
       }

   }

}