using Diagnosis.Application.DTOs.Profile;
using Diagnosis.Domain.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.Interfaces
{
    public interface IPatientManagement: IRepository<Patient>
    {
        Task<PatientProfileDto?> GetPatientProfileAsync(int patientId);
    }
}
