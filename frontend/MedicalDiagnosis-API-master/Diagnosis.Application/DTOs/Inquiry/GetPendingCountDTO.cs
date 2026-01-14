using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Inquiry
{
    public class GetPendingCountDTO
    {
        public int PendingInquiriesCount { get; set; }
    }
}