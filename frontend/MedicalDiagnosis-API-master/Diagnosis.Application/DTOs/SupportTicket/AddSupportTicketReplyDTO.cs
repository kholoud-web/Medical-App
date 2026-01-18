using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.SupportTicket
{
    public class AddSupportTicketReplyDTO
    {
        public int TicketId { get; set; }
        public string Reply { get; set; }
    }
}
