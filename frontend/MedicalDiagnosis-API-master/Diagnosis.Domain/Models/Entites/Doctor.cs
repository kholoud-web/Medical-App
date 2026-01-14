using Diagnosis.Domain.Models.Entites;
using Diagnosis.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Domain.Entites
{
    public class Doctor: BaseEntity
    {
        public string? UserId { get; set; }
        public ApplicationUser? User { get; set; }
        public string? FName { get; set; }
        public string? LName { get; set; }
        public string? Specialization { get; set; }
        public string? NationalId { get; set; }
        public DateTime BirhDate { get; set; }
        public string? Gender { get; set; }
        public DateOnly LastResetDate { get; set; }
        public int DiagnosisPerDay { get; set; }
        public string? Address { get; set; }
        public int? ExperienceYears { get; set; }
        public decimal? Rating { get; set; }
        public string? ProfileImageUrl { get; set; }
        public ICollection<Payment>? Payments { get; set; }
        public ICollection<BoneFraction>? BoneFractions { get; set; }
        public ICollection<Inquiry>? Inquiries { get; set; }
        public ICollection<SupportTicket>? SupportTickets { get; set; }


    }
}
