using Diagnosis.Application.DTOs.SupportTicket;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.SupportTicket
{
    public class AddSuportTicketReplyUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AddSuportTicketReplyUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task AddSupportTicketReplyAsync(AddSupportTicketReplyDTO supportTicketReplyDTO)
        {
            await _unitOfWork.SupportTicket.AddSupportTicketReplyAsync(supportTicketReplyDTO);
        }
    }
}
