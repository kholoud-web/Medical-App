using Diagnosis.Application.DTOs.DiagnosisModule;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.Interfaces
{
    public interface IDiagnosisModuleProvider
    {
        Task<ProviderResponse> GetDiagnosisAsync(IFormFile formFile);
    }
}
