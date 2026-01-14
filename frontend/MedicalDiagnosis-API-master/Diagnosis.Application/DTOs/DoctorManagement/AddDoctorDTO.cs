using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.DoctorManagement
{
    public class AddDoctorDTO
    {
        [Required(ErrorMessage = "UserName is required")]
        public string? UserName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
         ErrorMessage = "Invalid email format")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "password is required")]
        [DataType(DataType.Password)]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$",
         ErrorMessage = "Password must contain uppercase, lowercase, digit, special character and be at least 8 characters long.")]

        public string? Password { get; set; }

        [Required(ErrorMessage = "Password confirmation is required")]
        [Compare("Password", ErrorMessage = "password and confirmation do not match")]
        public string? ConfirmPassword { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string? PhoneNumber { get; set; }
        public string? Gender { get; set; }
        public string? NationalId { get; set; }
        public DateTime BirhDate { get; set; }
        public string? Address { get; set; }
        public int? ExperienceYears { get; set; }

        [Required(ErrorMessage = "ClientUri is required")]
        public string? ClientUri { get; set; }
    }

    public class AddDoctorRespose
    {
        public string? Message { get; set; }
        public bool Success { get; set; }
    }
}
