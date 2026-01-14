using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Diagnosis.Domain.Models.Entites;
using Diagnosis.Application.DTOs.DrugChecker;


namespace Diagnosis.Application.UseCases.DrugChecker
{
    public class DrugSuggestionUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public DrugSuggestionUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<DrugSuggestionDTO>> GetSuggestionsAsync(string keyword)
        {
            return await _unitOfWork.DrugChecker.GetSuggestionsAsync(keyword);
        }
    }
    }