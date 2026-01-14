using Diagnosis.Application.DTOs.Inquiry;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.Services.FileService;
using Microsoft.Extensions.Configuration;
using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.Inquiry
{
    public class GetInquiryUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileService _fileService;
        private readonly IConfiguration _config;
        public GetInquiryUseCase(IUnitOfWork unitOfWork, IFileService fileService, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _fileService = fileService;
            _config = config;
        }

        public async Task<GetInquiryDTO> ExecuteAsync(string userId, int inquiryId)
        {
            try
            {
                var patientId = await _unitOfWork.Inquiry.GetPatientAsync(userId);
                var inquiry = await _unitOfWork.Inquiry.GetAsync(c => c.Id == inquiryId
                && c.PatientId == patientId
                && c.Type == Domain.Models.Entites.ConsultationType.Inquiry);

                if (inquiry == null) throw new ArgumentNullException(nameof(inquiry));

                var baseUrl = _config.GetSection("BaseUrl");

                var files = inquiry.FileUrls?
                    .Select(path => $"{baseUrl}/{path}")
                    .ToList()
                    ?? new List<string>();

                var dto = new GetInquiryDTO();

                dto.DoctorId = patientId;
                dto.Notes = inquiry.Notes;
                dto.Date = inquiry.Date;
                dto.Symptoms = inquiry.Symptoms;
                dto.Files = files;

                if (inquiry.Status == Domain.Models.Entites.ConsultationStatus.Pending)
                {
                    dto.Status = "In Progress";
                }
                else if (inquiry.Status == Domain.Models.Entites.ConsultationStatus.Rejected)
                {
                    dto.Status = "Replied";
                    dto.RejectReason = inquiry.RejectReason;
                    dto.RejectNotes = inquiry.RejectNotes;
                }
                else
                {
                    dto.Status = "Replied";
                    //dto.Description = inquiry.Description;
                }
                return dto;
            }
            catch (Exception ex)
            {

                throw new Exception("Error with fetching Inquiry: "+ex);
            }
        }
    }
}
