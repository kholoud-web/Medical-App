using Diagnosis.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Domain.Entites
{
    public enum FileType
    {
        LabTest = 0, XRay = 1, Prescription = 2
    }

    public class MedicalFiles: BaseEntity
    {       
        public int PatientId { get; set; }
        public string? Name { get; set; }
        public FileType? Type { get; set; }
        public string? FileUrl { get; set; }
        public Patient? Patient { get; set; }
    
    }
}
