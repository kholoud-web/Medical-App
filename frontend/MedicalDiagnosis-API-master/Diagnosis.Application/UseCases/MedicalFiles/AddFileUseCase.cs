using Diagnosis.Application.DTOs.MedicalFiles;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.Services.FileService;
using Diagnosis.Domain.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.MedicalFiles
{
    public class AddFileUseCase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileService _fileService;
        public AddFileUseCase(IUnitOfWork unitOfWork, IFileService fileService)
        {
            _unitOfWork = unitOfWork;
            _fileService = fileService;
        }

        public async Task<MedicalFileResponse> ExecuteAsync(AddMedicalFileDTO addMedicalFileDTO, string userId)
        {
            if (string.IsNullOrEmpty(addMedicalFileDTO.Type) || addMedicalFileDTO.File == null)
            {
                return new MedicalFileResponse
                {
                    Success = false,
                    Message = "Type or File sent is null"
                };
            }

            if (!Enum.TryParse<FileType>(
                addMedicalFileDTO.Type,
                ignoreCase: true,
                out var type))
            {
                return new MedicalFileResponse
                {
                    Success = false,
                    Message = "Invalid File Type"
                };
            }

            var fileUrl = await _fileService.UploadFileAsync(addMedicalFileDTO.File!);

            var patientId = await _unitOfWork.Inquiry.GetPatientAsync(userId);

            try
            {
                await _unitOfWork.MedicalFiles.AddAsync(new Domain.Entites.MedicalFiles
                {
                    PatientId = patientId,
                    Name = addMedicalFileDTO.File.FileName,
                    FileUrl = fileUrl,
                    Type = type
                });
                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return new MedicalFileResponse
                {
                    Success = false,
                    Message = "Error while adding file: "+ ex.Message
                };
            }
            return new MedicalFileResponse
            {
                Success = true,
                Message = "File saved successfully"
            };

        }
    }
}
