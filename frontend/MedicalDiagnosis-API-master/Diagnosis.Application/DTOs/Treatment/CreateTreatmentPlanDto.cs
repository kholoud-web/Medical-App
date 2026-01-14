
using System.ComponentModel.DataAnnotations;

namespace Diagnosis.Application.DTOs.Treatment
{
    public class CreateTreatmentPlanDto
    {
        [Required]
        public string? PatientId { get; set; }
        [Required]
        public string? DoctorId { get; set; }
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
