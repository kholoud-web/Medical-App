using Diagnosis.Application.DTOs.MedicalFiles;
using Diagnosis.Application.UseCases.MedicalFiles;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Diagnosis.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MedicalFilesController : ControllerBase
    {
        [HttpGet("all")]
        public async Task<IActionResult> GetAllFiles(
            [FromServices] GetFilesForPatientUseCase getFilesForPatientUseCase
            )
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!.ToString();
            var result = await getFilesForPatientUseCase.ExecuteAsync(userId);

            return Ok(result);
        }

        [HttpGet("{fileId}")]
        public async Task<IActionResult> GetFile(
            [FromRoute] int fileId,
            [FromServices] GetFileUseCase getFileUseCase
            )
        {
            var result = await getFileUseCase.ExecuteAsync(fileId);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> AddFile(
            [FromBody] AddMedicalFileDTO addMedicalFileDTO,
            [FromServices] AddFileUseCase addFileUseCase
            )
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!.ToString();
            var result = await addFileUseCase.ExecuteAsync(addMedicalFileDTO, userId);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [HttpDelete("{fileId}")]
        public async Task<IActionResult> DeleteFile(
            [FromRoute] int fileId,
            [FromServices] DeleteFileUseCase deleteFileUseCase
            )
        {
            var result = await deleteFileUseCase.ExecuteAsync(fileId);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
