using Diagnosis.Domain.Models.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.SystemSettings
{
    public class ContactMessageDTO
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Message { get; set; }
    }
    public class ContactMessageResponseDTO
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Message { get; set; }
        public string? Status { get; set; }
    }
}
