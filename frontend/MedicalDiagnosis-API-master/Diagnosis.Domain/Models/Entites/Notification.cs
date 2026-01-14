using Diagnosis.Domain.Models.Entites;
using Diagnosis.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Domain.Entites
{
    public enum NotificationType
    {
        Appointment,
        Prescription,
        Report,
        System,
        Physio
    }
    public class Notification:BaseEntity
    {
        public string? UserId { get; set; }
        public ApplicationUser? User { get; set; }
        public string? UserType { get; set; }
        public string? Title { get; set; }
        public string? Message { get; set; }
        public string? NotificationType { get; set; }
        public bool IsRead { get; set; }
        public int? RelatedId { get; set; }
        public string? RelatedType { get; set; }
        public DateTime? ReadAt { get; set; }

    }
}
