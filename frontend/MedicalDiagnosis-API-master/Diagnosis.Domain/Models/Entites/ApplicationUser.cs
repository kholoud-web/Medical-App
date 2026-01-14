using Diagnosis.Domain.Entites;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Domain.Models.Entites
{
    public class ApplicationUser: IdentityUser
    {
        public Doctor? Doctor { get; set; }
        public Patient? Patient { get; set; }
        public UserAIUsage? Usage { get; set; }
        public ICollection<Notification>? Notifications { get; set; }
        public ICollection<SupportTicket>? SupportTickets { get; set; }
        public bool ReceiveEmailNotifications { get; set; } = true;
    
    }
}
