using Diagnosis.Application.DTOs.Profile;
using Diagnosis.Application.Interfaces;
using Diagnosis.Domain.Entites;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Infrastracture.Repositories
{
    public class PatientRepository : Repository<Patient>, IPatientManagement
    {

        private readonly ApplicationDbContext _context;

        public PatientRepository(ApplicationDbContext context) : base(context)
        {

            _context = context;


        }

        //public IQueryable<Patient> Query()
        //=> _context.Set<Patient>().AsQueryable();

        //public async Task<List<Patient>> GetAllAsync()
        //    => await _context.Set<Patient>().ToListAsync();

        //public async Task<HashSet<Patient>> GetAllPagedAsync(
        //    int pageSize,
        //    int pageNumber,
        //    Expression<Func<Patient, object>> orderBy)
        //{
        //    var data = await _context.Set<Patient>()
        //        .OrderBy(orderBy)
        //        .Skip((pageNumber - 1) * pageSize)
        //        .Take(pageSize)
        //        .ToListAsync();

        //    return data.ToHashSet();
        //}

        //public async Task<List<Patient>> GetManyAsync(
        //    Expression<Func<Patient, bool>> predicate)
        //    => await _context.Set<Patient>().Where(predicate).ToListAsync();

        //public async Task<Patient?> GetAsync(
        //    Expression<Func<Patient, bool>> predicate)
        //    => await _context.Set<Patient>().FirstOrDefaultAsync(predicate);

        //public async Task<Patient?> GetByIdAsync(object[] keyValues)
        //    => await _context.Set<Patient>().FindAsync(keyValues);

        //public async Task AddAsync(Patient entity)
        //{
        //    await _context.Set<Patient>().AddAsync(entity);
        //    await _context.SaveChangesAsync();
        //}

        //public void Update(Patient entity)
        //{
        //    _context.Set<Patient>().Update(entity);
        //    _context.SaveChanges();
        //}

        //public async Task<bool> DeleteAsync(params object[] id)
        //{
        //    var entity = await _context.Set<Patient>().FindAsync(id);
        //    if (entity is null) return false;

        //    _context.Set<Patient>().Remove(entity);
        //    await _context.SaveChangesAsync();
        //    return true;
        //}
        public async Task<PatientProfileDto?> GetPatientProfileAsync(int patientId)
        {
            var patient = await _context.Set<Patient>()
                .FirstOrDefaultAsync(p => p.Id == patientId);

            if (patient == null) return null;

            return new PatientProfileDto
            {
                Id = patient.Id,
                FName = patient.FName,
                LName = patient.LName,
                Email = patient.User.Email,
                Gender = patient.Gender,



            };
        }
    }
}