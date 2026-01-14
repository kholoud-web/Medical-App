using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.DiagnosisModule
{
    public class ProviderResponse
    {
        public string? Prediction { get; set; }
        public string? Confidence { get; set; }
        public string? Image_base64 { get; set; }
    }
    public class BoneFractionResponseDTO
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public int DiagnosisId { get; set; }
        public string? Prediction { get; set; }
        public string? Confidence { get; set; }
        public string? ImgUrl { get; set; }
    }
}
