using Diagnosis.Application.DTOs.SupportTicket;
using Diagnosis.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.UseCases.SupportTicket
{
    public class GetSupportTicketsUseCase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetSupportTicketsUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<GetSupportTicketDTO>> GetSupportTicketsAsync()
        {
           return await _unitOfWork.SupportTicket.GetSupportTicketsAsync();
        }
    }
}
