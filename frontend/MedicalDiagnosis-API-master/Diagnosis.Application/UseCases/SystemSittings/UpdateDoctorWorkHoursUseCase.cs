using Diagnosis.Application.DTOs.SystemSettings;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.SystemSittings
{
    public class UpdateDoctorWorkHoursUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public UpdateDoctorWorkHoursUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<UsageResponse> ExecuteAsync(WorkHoursDTO maxRequestDTO)
        {
            return await _unitOfWork.systemSettings.UpdateDoctorWorkHoursAsync(maxRequestDTO);
        }
    }
}
