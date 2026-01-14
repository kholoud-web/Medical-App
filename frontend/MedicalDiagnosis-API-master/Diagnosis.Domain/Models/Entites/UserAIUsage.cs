using Diagnosis.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Domain.Models.Entites
{
    public class UserAIUsage: BaseEntity
    {
        public int UsedRequestsToday { get; set; }
        public DateOnly LastResetDate { get; set; }
        public string? UserId { get; set; }
        public ApplicationUser? User { get; set; }
    }
}
