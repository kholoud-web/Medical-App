using Diagnosis.Application.DTOs.SystemSettings;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.SystemSittings
{
    public class AddAdminUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AddAdminUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<AddAdminResponse> ExecuteAsync(AddAdminDTO addAdminDTO)
        {
            return await _unitOfWork.Auth.AddAdminAsync(addAdminDTO);
        }
    }
}
