using Diagnosis.API.Attributes;
using Diagnosis.Application.DTOs.DrugChecker;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.Services.EmailService;
using Diagnosis.Application.UseCases;
using Diagnosis.Application.UseCases.DrugChecker;
using Diagnosis.Domain.Models.Entites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Security.Claims;

namespace Diagnosis.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DrugCheckerController : ControllerBase
    {

        [Authorize(Roles = "Patient")]
        [AiEndpoint]
        [HttpPost("check")]
        public async Task<IActionResult> CheckDrug(
            [FromBody] DrugCheckerRequestDTO requestDTO,
            [FromServices] DrugCheckerUseCase _drugCheckerUseCase)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!.ToString();
            var result = await _drugCheckerUseCase.CheckDrugAsync(requestDTO, userId);
            if (result == null || !result.Success)
            {
                return BadRequest(result?.ErrorMessage ?? "Error checking drug");
            }
            return Ok(result);
        }
        [Authorize(Roles = "Patient")]
        [HttpGet("suggestions")]
        public async Task<IActionResult> GetSearchSuggestions(
            [FromQuery] string keyword,
            [FromServices] DrugSuggestionUseCase _drugSuggestionUseCase
            )
        {
            var result = await _drugSuggestionUseCase.GetSuggestionsAsync(keyword);
            if (result == null || !result.Any())
            {
                return NotFound("No suggestions found");
            }
            return Ok(result);
        }
    }
}