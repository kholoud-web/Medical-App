using Diagnosis.Application.DTOs.Profile;
using Diagnosis.Domain.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.Interfaces
{
    public interface IDoctorManagement:IRepository<Doctor>
    {
        Task<DoctorProfileDto?> GetDoctorProfileAsync(int doctorId);
    }
}
