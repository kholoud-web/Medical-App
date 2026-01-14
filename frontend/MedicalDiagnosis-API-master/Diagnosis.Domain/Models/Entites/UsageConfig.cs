using Diagnosis.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Domain.Models.Entites
{
    public class UsageConfig: BaseEntity
    {
        public int MaxRequestsPerDay { get; set; } = 100;
        public bool AiEnabled { get; set; } = true;
        public int MaxDiagnosisPerDay { get; set; } = 30;
        public int WorkHoursPweDoctor { get; set; } = 2;

    }
}
