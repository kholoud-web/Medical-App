using Diagnosis.Application.DTOs.Faq;
using Diagnosis.Application.Interfaces;
using Diagnosis.Domain.Models.Entites;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Infrastracture.Repositories
{
    public class FaqRepository : Repository<Faq> ,IFaq
    {
        private readonly ApplicationDbContext _context;
        private FaqType type;
        public FaqRepository(ApplicationDbContext context) :base(context)
        {
            _context = context;
        }
        public async Task<List<FaqResponseDTO>> GetAllFaqAsync(FaqDTO faqDTO)
        {
            if (faqDTO.Type == "Patient")
                type = FaqType.Patient;            
            else
                type = FaqType.Doctor;

                var query = _context.Faqs
                    .Where(f => f.Type == type)
                    .AsQueryable();

            var faqs = await query
                .Select(f => new FaqResponseDTO
                {
                    Question = f.Question,
                    Answer = f.Answer,
                   
                })
                .ToListAsync();
            return faqs;
        }
    }
}
