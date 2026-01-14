using Diagnosis.Application.DTOs.Treatment;
using Diagnosis.Application.Interfaces;
using Diagnosis.Domain.Models.Entites;
using Microsoft.EntityFrameworkCore;


namespace Diagnosis.Infrastracture.Repositories
{
    public class TreatmentRepository : ITreatmentRepository
    {
        private readonly ApplicationDbContext _context;

        public TreatmentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PatientTreatmentInfoDto> GetPatientTreatmentInfoAsync(string patientId)
        {
            var patient = await _context.Patients
                .Where(p => p.UserId == patientId)
                .Select(p => new PatientTreatmentInfoDto
                {
                    PatientId = p.UserId,
                    FullName = p.FName + " " + p.LName,
                    PatientIdentifier = p.UserId ?? "",
                    ProfileImageUrl = p.ProfileImageUrl
                })
                .FirstOrDefaultAsync();

            return patient;
        }

        public async Task<TreatmentPlanResponseDto> CreateTreatmentPlanAsync(CreateTreatmentPlanDto dto)
        {
            var treatmentPlan = new TreatmentPlan
            {
                PatientId = dto.PatientId,
                DoctorId = dto.DoctorId,
                Description = dto.Description,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,

            };

            _context.TreatmentPlans.Add(treatmentPlan);
            await _context.SaveChangesAsync();

            var response = await _context.TreatmentPlans
                .Where(t => t.Id == treatmentPlan.Id)
                .Include(t => t.Patient)
                .Include(t => t.Doctor)
                .Select(t => new TreatmentPlanResponseDto
                {
                    PatientId = t.PatientId,
                    PatientName = t.Patient.FName + " " + t.Patient.LName,
                    DoctorId = t.DoctorId,
                    DoctorName = t.Doctor.UserName,
                    Description = t.Description,
                    StartDate = t.StartDate,
                    EndDate = t.EndDate

                })
                .FirstOrDefaultAsync();

            return response;
        }

        public async Task<bool> PatientExistsAsync(string patientId)
        {
            return await _context.Patients.AnyAsync(p => p.UserId == patientId);
        }
    }
}
