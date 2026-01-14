using Diagnosis.Application.DTOs.Consultation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Profile
{
    public class PatientProfileDto
    {
        public int  Id { get; set; }

        public string FName { get; set; }
        public string LName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }

        public List<ConsultationDTO>? ConsultationHistory { get; set; }
    }
}
