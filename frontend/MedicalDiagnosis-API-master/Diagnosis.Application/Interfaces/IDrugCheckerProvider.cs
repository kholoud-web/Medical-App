using Diagnosis.Application.DTOs.DrugChecker;
using Diagnosis.Application.Services.EmailService;
using Diagnosis.Domain.Models.Entites;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.Interfaces
{
public interface IDrugCheckerProvider
{
    Task<DrugCheckerResponceDTO?> CheckDrugAsync(DrugCheckerRequestDTO requestDTO);
    Task<List<DrugSuggestionDTO>> GetSuggestionsAsync(string keyword);
}
}