using Diagnosis.Application.DTOs.Inquiry;
using Diagnosis.Application.DTOs.PhysiotherapyExercise;
using Diagnosis.Application.DTOs.Settings;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.Services.FileService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.PhysiotherapyExercise
{
    public class GetPhysiotherapyExerciseUseCase
    {
         private readonly IUnitOfWork _unitOfWork;
        public GetPhysiotherapyExerciseUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
         
        }
        public async Task<List<PhysiotherapyExerciseDto>> GetAllExercises()
        {
            var exercises = await _unitOfWork.PhysiotherapyExercise.GetAllAsync();
           return exercises.Select(e => new PhysiotherapyExerciseDto
            {
                Id = e.Id,
                Title = e.Title,
                BodyPart = e.BodyPart,
                Difficulty = e.Difficulty,
                DurationMinutes = e.DurationMinutes,
                YoutubeUrl = e.YoutubeUrl,
                ThumbnailUrl = e.ThumbnailUrl,
                
            }).ToList();
        }

    }}
