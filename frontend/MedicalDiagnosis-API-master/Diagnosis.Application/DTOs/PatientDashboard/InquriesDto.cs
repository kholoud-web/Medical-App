using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.PatientDashboard
{
    public class InquiriesDto
    {
        public int Id { get; set; }
        public string DoctorName { get; set; }
        public string Subject { get; set; } 
        public DateTime Date { get; set; }
        public DateTime Time { get; set; }
        public string Status { get; set; }

    }
}