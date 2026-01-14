
using Diagnosis.Application.Interfaces;
using Diagnosis.Domain.Entites; 
using Diagnosis.Domain.Models.Entites;
    public interface IProfileRepository : IRepository<ApplicationUser>
    {
        Task<ApplicationUser?> GetUserProfile(string userId);
  
    // Task<bool> UpdateUserProfile(string userId, string fullName, string email, string phoneNumber);

}