using Diagnosis.Application.DTOs.Faq;
using Diagnosis.Application.UseCases.Faq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Diagnosis.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HelpController : ControllerBase
    {
        [HttpGet("faqs")]
        public async Task<IActionResult> GetFaqs([FromQuery]FaqDTO faqDTO, [FromServices] GetFaqsUseCase faqsUseCase)
        {
            var faqs = await faqsUseCase.GetAllFaqAsync(faqDTO);
            return Ok(faqs);
        }
    }
}
