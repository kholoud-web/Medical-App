using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.MedicalFiles
{
    public class AddMedicalFileDTO
    {
        public IFormFile? File { get; set; }
        public string? Type { get; set; }
    }
    public class MedicalFileResponse
    {
        public string? Message { get; set; }
        public bool Success { get; set; }
    }
}
