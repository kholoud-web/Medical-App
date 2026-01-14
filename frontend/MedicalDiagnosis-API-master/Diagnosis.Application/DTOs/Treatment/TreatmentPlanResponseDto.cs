using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Treatment
{
    public class TreatmentPlanResponseDto
    {
        public string? Id { get; set; }
        public string? PatientId { get; set; }
        public string? PatientName { get; set; }
        public string? DoctorId { get; set; }
        public string? DoctorName { get; set; }
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
