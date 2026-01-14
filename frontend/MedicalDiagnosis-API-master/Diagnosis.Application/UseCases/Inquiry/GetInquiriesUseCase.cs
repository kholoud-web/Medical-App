using Diagnosis.Application.DTOs.Inquiry;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.Inquiry
{
    public class GetInquiriesUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetInquiriesUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ICollection<InquiryItemResponse>> ExecuteAsync(string userId)
        {
            try
            {
                var patientId = await _unitOfWork.Inquiry.GetPatientAsync(userId);
                var inquiries = await _unitOfWork.Inquiry.GetManyAsync(c => c.PatientId == patientId
                && c.Type == Domain.Models.Entites.ConsultationType.Inquiry);

                if (inquiries == null) throw new ArgumentNullException("Patient Id is incorrect");
                
                var dto = new List<InquiryItemResponse>();
                
                foreach (var inquiry in inquiries)
                {
                    if (inquiry.Status == Domain.Models.Entites.ConsultationStatus.Pending)
                    {
                        dto.Add(new InquiryItemResponse
                        {
                            Status = "In Progress",
                            Symptoms = inquiry.Symptoms,
                            InquiryId = inquiry.Id,
                            Date = inquiry.Date
                        });
                    }
                    else
                    {
                        dto.Add(new InquiryItemResponse
                        {
                            Status = "Replied",
                            Symptoms = inquiry.Symptoms,
                            InquiryId = inquiry.Id,
                            Date = inquiry.Date
                        });
                    }
                }
                return dto;
            }
            catch (Exception ex)
            {

                throw new Exception("Error while fetching Inquiries: "+ex);
            }

        }
    }
}
