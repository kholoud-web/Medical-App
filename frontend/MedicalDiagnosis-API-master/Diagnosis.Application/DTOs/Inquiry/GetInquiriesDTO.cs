using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Inquiry
{
    public class InquiryItemResponse
    {
        public string? Symptoms { get; set; }
        public int InquiryId { get; set; }
        public DateTime Date { get; set; }
        public string? Status { get; set; }
    }
}
