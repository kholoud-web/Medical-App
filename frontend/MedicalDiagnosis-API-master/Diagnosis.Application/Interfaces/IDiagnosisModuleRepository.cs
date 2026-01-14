using Diagnosis.Application.DTOs.DiagnosisModule;
using Diagnosis.Domain.Models.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.Interfaces
{
    public interface IDiagnosisModuleRepository : IRepository<Inquiry>
    {
        Task<BoneFractionResponseDTO> CreateDiagnosisAsync(CreateDiagnosisDTO createDiagnosisDTO, string userId);
    }

}
