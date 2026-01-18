using Diagnosis.Application.DTOs.MedicalFiles;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.MedicalFiles
{
    public class GetFileUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetFileUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetFileDTO> ExecuteAsync(int fileId)
        {
            var file = await _unitOfWork.MedicalFiles.GetByIdAsync(new object[] { fileId });

            if (file == null)
            {
                return new GetFileDTO
                {
                    Success = false,
                    Message = "No file found with this Id"
                };
            }

            return new GetFileDTO
            {
                Success = true,
                Name = file.Name,
                Type = file.Type.ToString(),
                FileUrl = file.FileUrl,
                Date = file.CreatedOn
            };
        }
    }
}
