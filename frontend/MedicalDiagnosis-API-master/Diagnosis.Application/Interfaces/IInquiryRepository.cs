using Diagnosis.Application.DTOs.Inquiry;
using Diagnosis.Application.DTOs.PatientDashboard;
using Diagnosis.Domain.Models.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.Interfaces
{
    public interface IInquiryRepository: IRepository<Inquiry>
    {
        Task<IquiryResponse> AddInquiryAsync(AddInquiryDTO addInquiryDTO, string userId);
        Task<int> GetPatientAsync(string userId);
        Task<List<InquiriesDto>> GetRecentInquiriesAsync(int patientId);
        Task<GetPendingCountDTO> GetPendingInquiriesCount(int patientId);
    }
}
