using Diagnosis.Domain.Models.Entites;
using Diagnosis.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Domain.Entites
{
    public class Patient: BaseEntity
    {
        public string? UserId { get; set; }
        public ApplicationUser? User { get; set; }
        public string? FName { get; set; }
        public string? LName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public string? BloodType { get; set; }
        public string? Allergies { get; set; }
        public string? ProfileImageUrl { get; set; }
        public bool? IsNewPatient { get; set; }
        public bool? IsUrgent { get; set; }
        public ICollection<MedicalFiles>? Files { get; set; }
        public ICollection<BoneFraction>? BoneFractions { get; set; }
        public ICollection<Inquiry>? Inquiries { get; set; }
        public ICollection<SupportTicket>? SupportTickets { get; set; }

    }
}
