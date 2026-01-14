using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Auth
{
    public class ResetPasswordDTO
    {
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
        [Compare("Password", ErrorMessage = "The Password and Confirmation password do not match")]
        public string? PasswordConfirmation { get; set; }
        public string? Email { get; set; }
        public string? Token { get; set; }
    }
    public class ResetPasswordResponseDTO
    {
        public  bool Success { get; set; }
        public string Message { get; set; }    
        public List<string>? Errors { get; set; }
    }
}
