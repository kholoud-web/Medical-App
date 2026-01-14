using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.DoctorDiagnosis
{
    public class TemplatesResponse
    {
        public int TemplateId { get; set; }
        public string Name { get; set; } = null!;
    }
}

