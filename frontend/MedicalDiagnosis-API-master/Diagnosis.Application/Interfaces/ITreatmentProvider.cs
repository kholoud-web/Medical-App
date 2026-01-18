using Diagnosis.Application.DTOs.Treatment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.Interfaces
{
    public interface ITreatmentProvider
    {
        Task<AITreatmentResponseDTO> CreateTreamentPlanAsync(int InquiryId);
    }
}
