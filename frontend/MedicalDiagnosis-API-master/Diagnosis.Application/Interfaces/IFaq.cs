using Diagnosis.Application.DTOs.Faq;
using Diagnosis.Domain.Models.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.Interfaces
{
    public interface IFaq: IRepository<Faq>
    {
        Task<List<FaqResponseDTO>> GetAllFaqAsync(FaqDTO faqDTO);
    }
}
