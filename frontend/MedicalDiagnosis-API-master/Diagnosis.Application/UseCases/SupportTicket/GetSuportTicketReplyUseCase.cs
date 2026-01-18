using Diagnosis.Application.DTOs.SupportTicket;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.SupportTicket
{
    public class GetSuportTicketReplyUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetSuportTicketReplyUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<SupportTicketReplyDTO?> GetLatestReplyByUserAsync(string userId)
        {
            return await _unitOfWork.SupportTicket.GetLatestReplyByUserAsync(userId);
        }
    }
}
