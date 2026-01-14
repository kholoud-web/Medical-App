using Diagnosis.Application.DTOs.Inquiry;
using Diagnosis.Application.DTOs.PatientDashboard;
using Diagnosis.Application.DTOs.PhysiotherapyExercise;
using Diagnosis.Application.DTOs.Settings;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.Services.FileService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.PatientDashboard
{
    public class GetPendingInquiriesCountUseCase
    {
         private readonly IUnitOfWork _unitOfWork;
        public GetPendingInquiriesCountUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }

        public async Task<GetPendingCountDTO> ExecuteAsync(string userId)
        {
            var patient = _unitOfWork.Inquiry.GetPatientAsync(userId);
            return await _unitOfWork.Inquiry.GetPendingInquiriesCount(patient.Id);
        }
    }
}