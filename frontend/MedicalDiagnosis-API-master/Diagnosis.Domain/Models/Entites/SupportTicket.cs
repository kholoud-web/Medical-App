using Diagnosis.Domain.Entites;
using Diagnosis.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Domain.Models.Entites
{
    public class SupportTicket: BaseEntity
    {
        public string? userId { get; set; }
        public ApplicationUser? User { get; set; }
        public  string? Subject { get; set; }
        public string? Details { get; set; }
        public string? Status { get; set; }
        public string? Reply { get; set; }
    }
}
