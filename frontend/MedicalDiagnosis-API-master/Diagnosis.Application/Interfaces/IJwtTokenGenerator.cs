using Diagnosis.Domain.Models.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.Interfaces
{
    public interface IJwtTokenGenerator
    {
        Task<(string token, DateTime expiresAt)> GenerateTokenAsync(ApplicationUser user, IList<string> roles);
    }
}