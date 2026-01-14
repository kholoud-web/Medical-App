using Diagnosis.Application.DTOs.MedicalFiles;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.MedicalFiles
{
    public class GetFilesForPatientUseCase
    {
        private IUnitOfWork _unitOfWork;

        public GetFilesForPatientUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ICollection<GetFilesForPatientDTO>> ExecuteAsync(string userId)
        {
            var patientId = await _unitOfWork.Inquiry.GetPatientAsync(userId);

            var files = await _unitOfWork.MedicalFiles.GetManyAsync(p => p.PatientId == patientId);

            var filesDTO = new List<GetFilesForPatientDTO>();

            foreach (var file in files)
            {
                filesDTO.Add(new GetFilesForPatientDTO
                {
                    fileId = file.Id,
                    Name = file.Name,
                    Date = file.CreatedOn
                });
            }
            return filesDTO;
        }
    }
}
