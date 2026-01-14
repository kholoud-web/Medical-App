using Diagnosis.Application.DTOs.MedicalFiles;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.MedicalFiles
{
    public class DeleteFileUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteFileUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<MedicalFileResponse> ExecuteAsync(int fileId)
        {
            await _unitOfWork.MedicalFiles.DeleteAsync(fileId);
            return new MedicalFileResponse
            {
                Success = true,
                Message = "File was deleted successfully"
            };
        }
    }
}
