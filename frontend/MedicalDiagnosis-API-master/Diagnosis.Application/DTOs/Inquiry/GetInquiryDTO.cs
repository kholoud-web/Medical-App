using Diagnosis.Domain.Models.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Inquiry
{
    public class GetInquiryDTO
    {
        public int DoctorId { get; set; }
        public string? Symptoms { get; set; }
        public string? Notes { get; set; }
        public string? Status { get; set; }
        public DateTime Date { get; set; }
        public ICollection<string>? Files { get; set; }
        public string? Description { get; set; }
        public string? RejectReason { get; set; }
        public string? RejectNotes { get; set; }
    }
}
