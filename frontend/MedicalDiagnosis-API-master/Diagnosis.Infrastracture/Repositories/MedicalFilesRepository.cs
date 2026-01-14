using Diagnosis.Application.Interfaces;
using Diagnosis.Domain.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Infrastracture.Repositories
{
    public class MedicalFilesRepository: Repository<MedicalFiles>, IMedicalFilesRepository
    {
        private readonly ApplicationDbContext _context;

        public MedicalFilesRepository(ApplicationDbContext context): base(context) 
        {
            _context = context;
        }

    }
}
