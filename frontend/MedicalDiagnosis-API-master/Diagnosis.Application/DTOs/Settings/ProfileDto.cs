using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Settings
{
    public class ProfileDto
    {
        public string FullName { get; set; }
        
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        
    }
}