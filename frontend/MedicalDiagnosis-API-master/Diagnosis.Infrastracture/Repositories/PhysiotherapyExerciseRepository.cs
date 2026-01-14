using Diagnosis.Application.DTOs.Auth;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.Services.EmailService;
using Diagnosis.Domain.Entites;
using Diagnosis.Domain.Models.Entites;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using MimeKit.Encodings;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Infrastracture.Repositories
{
    public class PhysiotherapyExerciseRepository :
    Repository<PhysiotherapyExercise>, IPhysiotherapyExerciseRepository
    {
        private readonly ApplicationDbContext _context;
        public PhysiotherapyExerciseRepository(ApplicationDbContext context): base(context)
        {
            _context = context;
        }

        
    }
}