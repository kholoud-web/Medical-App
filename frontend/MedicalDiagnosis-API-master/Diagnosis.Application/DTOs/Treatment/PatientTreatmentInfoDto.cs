using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Treatment
{
    public class PatientTreatmentInfoDto
    {
        public string? PatientId { get; set; }
        public string? FullName { get; set; }
        public string? PatientIdentifier { get; set; }
        public string? ProfileImageUrl { get; set; }
    }
}
