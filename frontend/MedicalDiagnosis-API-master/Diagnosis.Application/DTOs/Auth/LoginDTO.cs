using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Auth
{
    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string? ClientUri { get; set; }
    }

    public class LoginResponseDTO
    {
        public bool Success { get; set; } = true;
        public string Token { get; set; }
        public string ErrorMessage { get; set; }
        public DateTime? ExpiresAt { get; set; }
        
    }
}