using Diagnosis.Application.DTOs.Consultation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Profile
{
    public class DoctorProfileDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } 
        public string Email { get; set; } 
        public string PhoneNumber { get; set; } 
        public string Gender { get; set; } 
        public string NationalId { get; set; } 
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; } 
        public string Specialization { get; set; } 
        public bool IsActive { get; set; }

        // Statistics - من الصورة
        public int TotalPatients { get; set; }
        public int FinishedConsultations { get; set; }
        public int NewPatients { get; set; }
        public int TotalConsultations { get; set; }
        public List<ConsultationDTO>? ConsultationHistory { get; set; }
    }
}
