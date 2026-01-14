using Diagnosis.Domain.Models.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.SystemSettings
{
    public class SupportRequestDTO
    {
        public int RequestId { get; set; }
        public string? Reply { get; set; }
    }
    public class SupportRequestResponseDTO
    {
        public int RequestId { get; set; }
        public string? Reply { get; set; }
        public RequestStatus Status { get; set; }

    }
}
