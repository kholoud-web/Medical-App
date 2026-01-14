using Diagnosis.Domain.Entites;
using Diagnosis.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Domain.Models.Entites
{
    public enum ConsultationStatus
    {
        Pending = 0,
        Accepted = 1,
        Rejected = 2,
        Canceled = 3
    }

    public class Inquiry: BaseEntity
    {
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public string? Symptoms { get; set; }
        public string? Description { get; set; }
        public ConsultationStatus Status { get; set; }
        public ICollection<string>? InquiryFiles { get; set; }
        public string? TreatmentUrl { get; set; }
        public string? PrescriptionUrl { get; set; }
        public int Rate { get; set; }
        public string? Reply { get; set; }
        public string? RejectReason { get; set; }
        public string? RejectNotes { get; set; }
        public Patient? Patient { get; set; }
        public Doctor? Doctor { get; set; }

    }
}
