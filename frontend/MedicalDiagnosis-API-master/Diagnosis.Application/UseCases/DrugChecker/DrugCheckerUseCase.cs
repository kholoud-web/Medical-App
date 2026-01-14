using Diagnosis.Application.DTOs.DiagnosisModule;
using Diagnosis.Application.DTOs.DrugChecker;
using Diagnosis.Application.Interfaces;
using Diagnosis.Domain.Models.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Diagnosis.Application.UseCases.DrugChecker
{
    public class DrugCheckerUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public DrugCheckerUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<DrugCheckerResponceDTO?> CheckDrugAsync(DrugCheckerRequestDTO requestDTO, string userId)
        {
            var canUseAI = await _unitOfWork.systemSettings.CanUseAiAsync(userId);
            if (!canUseAI)
            {
                return new DrugCheckerResponceDTO
                {
                    Success = false,
                    ErrorMessage = "You have reached the limit of using AI requests per day"
                };
            }
            return await _unitOfWork.DrugChecker.CheckDrugAsync(requestDTO);
        }
    }
}