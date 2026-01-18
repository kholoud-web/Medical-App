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
    public class ProfileRepository : Repository<ApplicationUser>, IProfileRepository
    {
        private readonly ApplicationDbContext _context;
        public ProfileRepository(ApplicationDbContext context) : base(context)
        {

            _context = context;
        }
        //get user profile by id
        public async Task<ApplicationUser?> GetUserProfile(string userId)
        {
            return await _context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.Doctor)
                .Include(u => u.Patient)
                .FirstOrDefaultAsync();
        }


    }
}