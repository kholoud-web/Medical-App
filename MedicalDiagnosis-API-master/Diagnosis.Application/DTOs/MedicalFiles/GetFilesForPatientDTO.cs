using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.MedicalFiles
{
    public class GetFilesForPatientDTO
    {
        public int fileId { get; set; }
        public string? Name { get; set; }
        public DateTime? Date { get; set; }
    }
}
