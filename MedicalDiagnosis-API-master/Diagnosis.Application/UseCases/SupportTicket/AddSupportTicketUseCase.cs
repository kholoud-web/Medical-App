 using Diagnosis.Application.DTOs.SupportTicket;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.SupportTicket
{
    public class AddSupportTicketUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AddSupportTicketUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }        

        public async Task CreateSupportTicketAsync(string userId , SupportTicketDTO supportTicketDTO)
        {

            await _unitOfWork.SupportTicket.CreateSupportTicketAsync(supportTicketDTO , userId);
        }
    }
}
