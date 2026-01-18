using Diagnosis.Application.DTOs.Dashboard;

namespace Diagnosis.Application.Interfaces
{
    public interface IDoctorDashboardService
    {

        Task<DoctorDashboardDto> GetDashboardAsync(int doctorId);

    }
}
