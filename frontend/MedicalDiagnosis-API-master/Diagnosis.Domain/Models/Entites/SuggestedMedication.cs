using Diagnosis.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Domain.Models.Entites
{
    public class SuggestedMedication: BaseEntity
    {
        public string? Name { get; set; }
        public string? Frequency { get; set; }
        public string? Dosage { get; set; }

        [ForeignKey("Diagnosis")]
        public int DiagnosisId { get; set; }
        public DoctorDiagnosis? Diagnosis { get; set; }
    }
}
