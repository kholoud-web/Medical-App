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
    public class GetRecentInquiriesUseCase
    {
         private readonly IUnitOfWork _unitOfWork;
        public GetRecentInquiriesUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        public async Task<List<InquiriesDto>> GetRecentInquiries(string userId)
        {
            var patient = _unitOfWork.Inquiry.GetPatientAsync(userId);
            var inquiries = await _unitOfWork.Inquiry.GetRecentInquiriesAsync(patient.Id);
            return inquiries;
        }

    }
}