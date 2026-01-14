using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Inquiry
{
    public class AddInquiryDTO
    {
        public int DoctorId { get; set; }
        public string? Symptoms { get; set; }
        public string? Notes { get; set; }
        public ICollection<IFormFile>? Files { get; set; }

    }

    public class IquiryResponse
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
    }
}
