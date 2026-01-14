using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.Settings
{
    public class SettingsDto
    {
        public bool ReceiveEmailNotifications { get; set; }

       public bool TwoFactorEnabled { get; set; }

       public string? ProfilePictureUrl { get; set; }
    }}