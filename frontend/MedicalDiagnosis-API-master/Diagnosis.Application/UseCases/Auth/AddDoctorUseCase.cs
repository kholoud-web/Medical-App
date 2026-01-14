using Diagnosis.Application.DTOs.DoctorManagement;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.Auth
{
    public class AddDoctorUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AddDoctorUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Task<AddDoctorRespose> ExecuteAsync(AddDoctorDTO addDoctorDTO)
        {
            return _unitOfWork.Auth.AddDoctorAsync(addDoctorDTO);
        }
    }
}
