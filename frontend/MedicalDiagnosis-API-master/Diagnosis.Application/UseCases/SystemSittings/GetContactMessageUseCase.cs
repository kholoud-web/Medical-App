using Diagnosis.Application.DTOs.SystemSettings;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.SystemSittings
{
    public class GetContactMessageUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetContactMessageUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<ContactMessageResponseDTO>> GetContactMessageRequests()
        {
           return await _unitOfWork.systemSettings.GetContactMessageRequests();
        }
    }
}
