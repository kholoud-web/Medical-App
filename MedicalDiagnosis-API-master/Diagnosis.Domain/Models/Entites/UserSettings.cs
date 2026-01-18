using Diagnosis.Domain.Entites;
using Diagnosis.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Domain.Models.Entites
{
    public class UserSettings : BaseEntity
    {
        public string UserId { get; set; } = string.Empty;
        public bool ReceiveEmailNotifications { get; set; } = true;
        public bool TwoFactorEnabled { get; set; } = false;
        public ApplicationUser User { get; set; }
    }
}