using Diagnosis.Application.DTOs.SystemSettings;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.SystemSittings
{
    public class AddContactMessageUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AddContactMessageUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task SendContactMessage(ContactMessageDTO contactMessageDTO)
        {
            await _unitOfWork.systemSettings.SendContactMessage(contactMessageDTO);
        }
    }
}
