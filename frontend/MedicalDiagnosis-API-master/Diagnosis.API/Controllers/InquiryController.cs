using Diagnosis.Application.DTOs.Inquiry;
using Diagnosis.Application.UseCases.Inquiry;
using Diagnosis.Application.UseCases.PatientDashboard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Diagnosis.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Roles = "Patient")]
    public class InquiryController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> AddInquiry(
            [FromServices] AddInquiryUseCase addInquiryUseCase,
            [FromForm] AddInquiryDTO addInquiryDTO)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!.ToString();
            var result = await addInquiryUseCase.ExecuteAsync(addInquiryDTO, userId);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    

        [HttpGet("inquiries")]
        public async Task<IActionResult> GetInquiries(
        [FromServices] GetInquiriesUseCase getInquiriesUseCase)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!.ToString();
            var result = await getInquiriesUseCase.ExecuteAsync(userId);
            return Ok(result);
        }

        [HttpGet("{inquiryId}")]
        public async Task<IActionResult> GetInquiry(
            [FromRoute] int inquiryId,
            [FromServices] GetInquiryUseCase getInquiryUseCase)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!.ToString();

            var result = await getInquiryUseCase.ExecuteAsync(userId, inquiryId);
            return Ok(result);
        }

        [HttpGet("recent")]
        public async Task<IActionResult> GetRecentInquiries(
            [FromServices] GetRecentInquiriesUseCase getRecentInquiriesUseCase)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!.ToString();
            var result = await getRecentInquiriesUseCase.GetRecentInquiries(userId);
            return Ok(result);
        }

        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingInquiriesCount(
            [FromServices] GetPendingInquiriesCountUseCase getPendingInquiriesCountUseCase)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!.ToString();
            var result = await getPendingInquiriesCountUseCase.ExecuteAsync(userId);
            return Ok(result);
        }
    }
}
