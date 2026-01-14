using Diagnosis.Application.DTOs.Faq;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.Faq
{
    public class GetFaqsUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetFaqsUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<FaqResponseDTO>> GetAllFaqAsync(FaqDTO faqDTO)
        {
            return await _unitOfWork.Faq.GetAllFaqAsync( faqDTO);
        }
    }
}
