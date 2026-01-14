using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Auth
{
    public class ForgotPasswordDTO
    {
        [Required]
        [EmailAddress]
        public string? Email {  get; set; }
        [Required]
        public string? ClientUri { get; set; }
    }
    public class ForgotPasswordResponseDTO
    {
        //    public EmailInfo Email { get; set; }
        //}
        //public class EmailInfo
        //{
        //    public string Address { get; set; }
        //    public string Token { get; set; }

        public bool Success { get; set; }
        public string? Message { get; set; }
    }
   
}
