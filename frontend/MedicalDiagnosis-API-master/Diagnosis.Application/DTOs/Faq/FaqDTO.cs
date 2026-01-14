using Diagnosis.Domain.Models.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Faq
{
    public class FaqDTO
    {
        public string? Type { get; set; }
    }
    public class FaqResponseDTO
    {
        public string Question { get; set; } = null!;
        public string Answer { get; set; }
    }
}
  