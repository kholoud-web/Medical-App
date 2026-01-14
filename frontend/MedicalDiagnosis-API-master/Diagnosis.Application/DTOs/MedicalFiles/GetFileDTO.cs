using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.MedicalFiles
{
    public class GetFileDTO
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public string? Name { get; set; }
        public string? Type { get; set; }
        public DateTime? Date { get; set; }
        public string? FileUrl { get; set; }
    }
}
