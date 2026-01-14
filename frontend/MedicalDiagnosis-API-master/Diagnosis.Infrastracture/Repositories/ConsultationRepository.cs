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
using Diagnosis.Application.DTOs.PatientDashboard;

namespace Diagnosis.Infrastracture.Repositories
{
    public class ConsultationRepository : Repository<Inquiry>, IConsultationRepository
    {
        private readonly ApplicationDbContext _context;

        public ConsultationRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        
        public IQueryable<Inquiry> GetQueryable()
        {
            return _context.Consultations.AsQueryable();
        }

        public async Task<List<Inquiry>> GetByDoctorIdAsync(int doctorId)
        {
            return await _context.Consultations
                .Where(c => c.DoctorId == doctorId)
                .Include(c => c.Patient)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<List<Inquiry>> GetByPatientIdAsync(int patientId)
        {
            return await _context.Consultations
                .Where(c => c.PatientId == patientId)
                .Include(c => c.Doctor)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<List<Inquiry>> GetByStatusAsync(ConsultationStatus status)
        {
            return await _context.Consultations
                .Where(c => c.Status == status)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Inquiry?> GetDetailsAsync(int consultationId)
        {
            return await _context.Consultations
                .Include(c => c.Patient)
                .Include(c => c.Doctor)
                .FirstOrDefaultAsync(c => c.Id == consultationId);
        }

        public async Task<ConsultationDetailsDTO> GetConsultationDetailsAsync(int consultationId)
        {
            var consultation = await _context.Consultations
                .Include(c => c.Patient)
                .Include(c => c.Doctor)
                .FirstOrDefaultAsync(c => c.Id == consultationId);

            if (consultation == null)
            {
                return new ConsultationDetailsDTO
                {
                    Success = false,
                    ErrorMessage = "Consultation not found"
                };
            }

            return new ConsultationDetailsDTO
            {
                Id = consultation.Id,
                PatientName = consultation.Patient.FName + " " + consultation.Patient.LName,
                PatientBirthDate = consultation.Patient.DateOfBirth,
                PatientGender = consultation.Patient.Gender,
                Notes = consultation.Notes,
                Attachments = consultation.FileUrls.ToList(),
                Symptoms = consultation.Symptoms,
                Response = consultation.Notes,
                RequestDate = consultation.Date,
                Success = true
            };
        }

        public async Task<ConsultationResponseDTO> RejectConsultationAsync(RejectConsultationDTO dto, int consultationId)
        {
            var consultation = await _context.Consultations.FindAsync(consultationId);
            if (consultation == null)
            {
                return new ConsultationResponseDTO
                {
                    Success = false,
                    ErrorMessage = "Consultation not found"
                };
            }

            consultation.Status = ConsultationStatus.Rejected;
            consultation.RejectReason = dto.Reason;
            consultation.RejectNotes = dto.Notes;

            _context.Consultations.Update(consultation);
            await _context.SaveChangesAsync();

            return new ConsultationResponseDTO
            {
                Success = true
            };
        }

        public async Task<ModifyConsultationDTO> GetModifyDataAsync(int consultationId)
        {
            var consultation = await _context.Consultations
                .Include(c => c.Patient)
                .FirstOrDefaultAsync(c => c.Id == consultationId);

            if (consultation == null)
            {
                return new ModifyConsultationDTO
                {
                    Success = false,
                    ErrorMessage = "Consultation not found"
                };
            }

            return new ModifyConsultationDTO
            {
                ConsultationId = consultation.Id,
                Name = consultation.Patient.FName + " " + consultation.Patient.LName,
                Description = consultation.Symptoms,
                Notes = consultation.Notes,
                Success = true
            };
        }

        public async Task<ModifyConsultationResponseDTO> ModifyConsultationAsync(
            ModifyConsultationRequestDTO dto,
            int consultationId)
        {
            var consultation = await _context.Consultations.FindAsync(consultationId);
            if (consultation == null)
            {
                return new ModifyConsultationResponseDTO
                {
                    Success = false,
                    ErrorMessage = "Consultation not found"
                };
            }

            consultation.Symptoms = dto.Description;
            consultation.Notes = dto.Notes;

            _context.Consultations.Update(consultation);
            await _context.SaveChangesAsync();

            return new ModifyConsultationResponseDTO
            {
                Success = true
            };
        }

        public async Task<ConsultationResponseDTO> AcceptConsultationAsync(int consultationId)
        {
            var consultation = await _context.Consultations.FindAsync(consultationId);
            if (consultation == null)
            {
                return new ConsultationResponseDTO
                {
                    Success = false,
                    ErrorMessage = "Consultation not found"
                };
            }

            consultation.Status = ConsultationStatus.Accepted;
            _context.Consultations.Update(consultation);
            await _context.SaveChangesAsync();

            return new ConsultationResponseDTO
            {
                Success = true
            };
        }
      
        public async Task<ConsultationResponseDTO> CancelConsultationAsync(int consultationId)
        {
            var consultation = await _context.Consultations.FindAsync(consultationId);
            if (consultation == null)
            {
                return new ConsultationResponseDTO
                {
                    Success = false,
                    ErrorMessage = "Consultation not found"
                };
            }

            consultation.Status = ConsultationStatus.Canceled;
            _context.Consultations.Update(consultation);
            await _context.SaveChangesAsync();

            return new ConsultationResponseDTO
            {
                Success = true
            };
        }
        public async Task<int> GetDoctorAsync(string userId)
        {
            var doctor = await _context.Doctors.FirstOrDefaultAsync(p => p.UserId == userId);
            if (doctor == null)
                throw new ArgumentNullException(nameof(doctor));
            return doctor.Id;
        }
        
        public async Task<Dictionary<string, int>> GetConsultationCountByDayAsync(int patientId)
        {

            var today = DateTime.UtcNow.Date;
            int diff = (7 + (today.DayOfWeek - DayOfWeek.Monday)) % 7;
            var startOfWeek = today.AddDays(-diff);
            var endOfWeek = startOfWeek.AddDays(7).AddTicks(-1);

            var consultations = await _context.Consultations
                .Where(c => c.Date >= startOfWeek && c.Date <= endOfWeek && c.PatientId == patientId)
                .GroupBy(c => c.Date.Date)
                .Select(g => new
                {
                    Date = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            return consultations.ToDictionary(c => c.Date.DayOfWeek.ToString(), c => c.Count);
        }
        
        public async Task<TopSymptomsDTO> GetTopSymptomsThisWeek(int patientId)
        {
            var today = DateTime.UtcNow.Date;
            int diff = (7 + (today.DayOfWeek - DayOfWeek.Monday)) % 7;
            var startOfWeek = today.AddDays(-diff);
            var endOfWeek = startOfWeek.AddDays(7).AddTicks(-1);

            var symptoms = await _context.Consultations
                .Where(c => c.Date >= startOfWeek && c.Date <= endOfWeek && c.PatientId == patientId)
                .Select(c => c.Symptoms)
                .ToListAsync();

              
              

            var topSymptom = symptoms.GroupBy(s => s)
                .OrderByDescending(g => g.Count())
                .Select(g => g.Key)
                .Take(1)
                .SingleOrDefault();

                  //parse by comma and get only first symptom
                  var firstSymptom = topSymptom?.Split(",").FirstOrDefault()?.Trim();
            return new TopSymptomsDTO
            {
                Symptom = firstSymptom
            };
        }

    }
}
