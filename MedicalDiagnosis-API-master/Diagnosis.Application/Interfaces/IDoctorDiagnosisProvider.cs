using Diagnosis.Application.DTOs.DoctorDiagnosis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.Interfaces
{
    public interface IDoctorDiagnosisProvider
    {
        Task<DoctorDiagnosisResponse> GetDoctorDiagnosisAsync(GetDoctorDiagnosisDTO getDoctorDiagnosisDTO);
        Task<DoctorDiagnosisResponse> GetTemplateAsync(int templateId);
        Task<ICollection<TemplatesResponse>> GetTemplatesAsync();
    }
}
