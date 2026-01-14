using Diagnosis.Domain.Entites;
using Diagnosis.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Domain.Models.Entites
{
    public class DoctorDiagnosis: BaseEntity
    {
        public string? PatientSymptoms { get; set; }
        public string? Description { get; set; }
        public string? Title { get; set; }
        public string? Name { get; set; }
        public ICollection<Symptom>? Symptoms { get; set; }
        public ICollection<SuggestedMedication>? SuggestedMedications { get; set; }
        public ICollection<ClinicalFinding>? ClinicalFindings { get; set; }

    }
}
