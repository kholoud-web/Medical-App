using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Treatment
{
    public class AITreatmentResponseDTO
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public string? Name { get; set; }
        public string? Dosage { get; set; }
        public string? Method { get; set; }
        public string? Frequency { get; set; }
        public string? TotalDuration { get; set; }
        public string? Alternatives { get; set; }
        public List<Atlernatives>? Atlernatives { get; set; }
        public List<string>? SideEffects { get; set; }

    }
 
    public class Atlernatives
    {
        public string? Name { get; set; }
        public List<string>? SideEffects { get; set; }

    }
}
