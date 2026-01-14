using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Consultation
{
    public class ConsultationDTO
    {
        public int Id {get; set;}
        public string PatientName { get; set; }
        public string PatientGender { get; set; }
        public DateTime? PatientBirthDate { get; set; }
        public string Type { get; set; }
        public string Symptoms { get; set; }
        public string? Response { get; set; }
        public string Status { get; set; }
        public DateTime RquestDate  { get; set; }
        public bool Success { get; set; } = true;
        public string ErrorMessage { get; set; }
    }
    public class RejectConsultationDTO
    {
       
        public string Reason { get; set; }
        public  string? Notes { get; set; }
    }
    public class ConsultationResponseDTO
    {
        public bool Success { get; set; } = true;
        public string ErrorMessage { get; set; }
    }

    public class ConsultationDetailsDTO
    {
        public int Id { get; set; }
        public string PatientName { get; set; }
        public DateTime? PatientBirthDate { get; set; }
        public string PatientGender { get; set; }
      
        public string Symptoms { get; set; }
        public string? Response { get; set; }
        
        public DateTime? RequestDate { get; set; }
        public string Notes { get; set; }
        public ICollection<string> Attachments { get; set; }
        public bool Success { get; set; } = true;
        public string ErrorMessage { get; set; }
    }
    
    public class ModifyConsultationDTO
    {
        public int ConsultationId { get; set; }
        public string Name{ get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public bool Success { get; set; } = true;
        public string ErrorMessage { get; set; }
       
    }
    public class ModifyConsultationResponseDTO
    {
        public bool Success { get; set; } = true;
        public string ErrorMessage { get; set; }
    }
    public class ModifyConsultationRequestDTO
    {
        public int ConsultationId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
    }
}