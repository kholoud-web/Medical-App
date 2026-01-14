using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.SystemSettings
{
    public class AddAdminDTO
    {
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

        [Compare("Password", ErrorMessage = "Password and password Confirmation must be same")]
        public string? ConfirmPassword { get; set; }
    }
    public class AddAdminResponse
    {
        public bool Success { get; set; } = true;
        public string? Message { get; set; }

    }
}
