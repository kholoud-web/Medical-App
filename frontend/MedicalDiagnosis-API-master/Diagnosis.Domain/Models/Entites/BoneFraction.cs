using Diagnosis.Domain.Entites;
using Diagnosis.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Domain.Models.Entites
{
    public class BoneFraction: BaseEntity
    {
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public ConsultationStatus Status { get; set; }
        public string? ConfidenceLevel { get; set; }
        public string? IncomingUrl { get; set; }
        public string? ResultUrl { get; set; }
        public string? Prediction { get; set; }
        public string? DoctorNotes { get; set; }
        public Patient? Patient { get; set; }
        public Doctor? Doctor { get; set; }
    }
}
