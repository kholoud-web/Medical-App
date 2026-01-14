using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.DiagnosisModule
{
    public class CreateDiagnosisDTO
    {
        public int DoctorId { get; set; }
        public IFormFile? File { get; set; }
    }
}
