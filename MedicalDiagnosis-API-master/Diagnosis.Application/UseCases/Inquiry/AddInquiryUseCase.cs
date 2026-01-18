using Diagnosis.Application.DTOs.Inquiry;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.Services.FileService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.Inquiry
{
    public class AddInquiryUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AddInquiryUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IquiryResponse> ExecuteAsync(AddInquiryDTO addInquiryDTO, string userId)
        {
            var response =  await _unitOfWork.Inquiry.AddInquiryAsync(addInquiryDTO, userId);
            await _unitOfWork.SaveChangesAsync();
            return response;
        }
    }
}
