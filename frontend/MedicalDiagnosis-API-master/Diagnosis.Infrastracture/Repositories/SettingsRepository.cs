using Diagnosis.Application.Interfaces;
using Diagnosis.Application.Services.EmailService;
using Diagnosis.Domain.Models.Entites;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Diagnosis.Application.DTOs.Consultation;

namespace Diagnosis.Infrastracture.Repositories
{
    public class SettingsRepository : Repository<ApplicationUser>, ISettingsRepository
    {
        private readonly ApplicationDbContext _context;
        public SettingsRepository(ApplicationDbContext context) : base(context)
        {

            _context = context;
        }
       
       public async Task<ApplicationUser?> GetUserSettings(string userId)
        {
            return await _context.Users
                .Where(u => u.Id == userId)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateUserSettings(ApplicationUser user)
        {
            _context.Users.Update(user);
            return await _context.SaveChangesAsync() > 0;
        }
    }}