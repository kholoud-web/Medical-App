using Diagnosis.Application.Interfaces;
using Diagnosis.Domain.Entites; 
using Diagnosis.Domain.Models.Entites;
    public interface ISettingsRepository : IRepository<ApplicationUser>
    {
       Task<ApplicationUser?> GetUserSettings(string userId);
       Task<bool> UpdateUserSettings(ApplicationUser user);
    }