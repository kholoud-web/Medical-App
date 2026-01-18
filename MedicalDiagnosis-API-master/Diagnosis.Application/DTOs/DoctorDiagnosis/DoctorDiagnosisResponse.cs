using Diagnosis.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.DoctorDiagnosis
{
    public class DoctorDiagnosisResponse
    {
        public bool Success { get; set; } = true;
        public string? Message { get; set; }
        public string? Name { get; set; }
        public ICollection<string>? Symptoms { get; set; }
        public ICollection<ClinicalFindingResponse>? ClinicalFindings { get; set; }
        public ICollection<SuggestedMedicationResponse>? SuggestedMedications { get; set; }
    }

    public class ClinicalFindingResponse
    {
        public string? Name { get; set; }
        public string? Value { get; set; }
        public string? Notes { get; set; }
    }

    public class SuggestedMedicationResponse
    {
        public string? Name { get; set; }
        public string? Frequency { get; set; }
        public string? Dosage { get; set; }
    }
}
