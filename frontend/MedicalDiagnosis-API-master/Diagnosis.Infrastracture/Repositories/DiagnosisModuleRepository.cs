using Diagnosis.Application.DTOs.DiagnosisModule;
using Diagnosis.Application.DTOs.Inquiry;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.Services.FileService;
using Diagnosis.Domain.Models.Entites;
using Diagnosis.Infrastracture.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Infrastracture.Repositories
{
    public class DiagnosisModuleRepository : Repository<Inquiry> , IDiagnosisModuleRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IFileService _fileService;
        private readonly IDiagnosisModuleProvider _provider;

        public DiagnosisModuleRepository(ApplicationDbContext context,
            IFileService fileService,
            IDiagnosisModuleProvider provider) : base(context)
        {
            _context = context;
            _fileService = fileService;
            _provider = provider;
        }

        public async Task<BoneFractionResponseDTO> CreateDiagnosisAsync(CreateDiagnosisDTO createDiagnosisDTO, string userId)
        {
            if (createDiagnosisDTO.File == null)
            {
                return new BoneFractionResponseDTO
                {
                    Success = false,
                    Message = "The image can't be null"
                };
            }
            
                if (!_fileService.IsValidFile(createDiagnosisDTO.File))
                {
                    return new BoneFractionResponseDTO
                    {
                        Success = false,
                        Message = "File not valid"
                    };
                }
            var fileUrl = await _fileService.UploadFileAsync(createDiagnosisDTO.File);
            
            var Diagnosis = await _provider.GetDiagnosisAsync(createDiagnosisDTO.File);

            var url = await _fileService.SaveBase64ImageAsync(Diagnosis.Image_base64!);
            var response = new BoneFractionResponseDTO
            {
                Prediction = Diagnosis.Prediction,
                Confidence = Diagnosis.Confidence,
                ImgUrl = url
            };

            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.UserId == userId);
            if (patient == null)
                throw new Exception("Error with Id");

            var consultaion = new Inquiry
            {
                PatientId = patient.Id,
                DoctorId = createDiagnosisDTO.DoctorId,
                Status = ConsultationStatus.Pending,
                Type = ConsultationType.BoneFraction,
                Date = DateTime.UtcNow,
                ConfidenceLevel = Diagnosis.Confidence,
                Prediction = Diagnosis.Prediction,
                IncomingUrl = fileUrl,
                ResultUrl = url
            };

            await _context.Consultations.AddAsync(consultaion);
            await _context.SaveChangesAsync();

            response.DiagnosisId = consultaion.Id;
            response.Success = true;
            return response;
        }
        // No more needed method, Thanks for your services 😔
        private async Task<List<(string FileName, byte[] Content, string ContentType)>>
            ConvertFilesToBytes(ICollection<IFormFile>files )
        {
            var filesData = new List<(string, byte[], string)>();

            foreach (var file in files)
            {
                using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream);

                filesData.Add((
                    file.FileName,
                    memoryStream.ToArray(),
                    file.ContentType
                ));
            }
            return filesData;
        }
    }
}
