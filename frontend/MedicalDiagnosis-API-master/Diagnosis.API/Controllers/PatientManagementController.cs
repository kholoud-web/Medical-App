using Diagnosis.Application.DTOs.Profile;
using Diagnosis.Application.Interfaces;
using Diagnosis.Domain.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Diagnosis.API.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class PatientManagementController: ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<PatientManagementController> _logger;

        public PatientManagementController(IUnitOfWork unitOfWork, ILogger<PatientManagementController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        /// <summary>
        /// احصل على بروفايل مريض
        /// GET: api/patient/{id}
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(PatientProfileDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetPatientProfile(int id)
        {
            try
            {
                var patient = await _unitOfWork.Patient.GetPatientProfileAsync(id);

                if (patient == null)
                {
                    _logger.LogWarning($"Patient with ID {id} not found");
                    return NotFound(new { message = "المريض غير موجود" });
                }

                return Ok(patient);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving patient profile for ID {id}");
                return StatusCode(500, new { message = "حدث خطأ في النظام" });
            }
            //private readonly IRepository<Patient> _patientRepository;

            //public PatientsController(IRepository<Patient> patientRepository)
            //{
            //    _patientRepository = patientRepository;
            //}

            //// ==========================
            //// GET: api/patients  (جدول المرضى)
            //// ==========================
            //[HttpGet]
            //public async Task<ActionResult<IEnumerable<PatientProfileDto>>> GetAll()
            //{
            //    var patients = await _patientRepository.Query()
            //        .Include(p => p.User)          // عشان Email من ApplicationUser
            //        .ToListAsync();

            //    var result = patients.Select(p => new PatientProfileDto
            //    {
            //        Id = p.Id,
            //        FName = p.FName,
            //        LName = p.LName,
            //        Email = p.User.Email,
            //        Gender = p.Gender,
            //        //IsNewPatient = p.IsNewPatient,
            //       // IsUrgent = p.IsUrgent
            //    }).ToList();

            //    return Ok(result);
            //}

            //// ======================================
            //// GET: api/patients/{id}/profile (البروفايل)
            //// ======================================
            //[HttpGet("{id:int}/profile")]
            //public async Task<ActionResult<PatientProfileDto>> GetProfile(int id)
            //{
            //    var patient = await _patientRepository.Query()
            //        .Include(p => p.User)
            //        .Include(p => p.Consultations)   // بس للـ Count أو لو عايزة تستخدمها
            //        .FirstOrDefaultAsync(p => p.Id == id);

            //    if (patient is null)
            //        return NotFound();

            //    var dto = new PatientProfileDto
            //    {
            //        Id = patient.Id,
            //        FName = patient.FName,
            //        LName = patient.LName,
            //        Email = patient.User.Email,
            //        Gender = patient.Gender,
            //        // خلي التاريخ كامل من كنترولر الـ Consultation اللي عندك
            //        ConsultationHistory = null
            //    };

            //    return Ok(dto);
            //}

            //// اختيارية: GET api/patients/{id}
            //[HttpGet("{id:int}")]
            //public async Task<ActionResult<Patient>> Get(int id)
            //{
            //    var patient = await _patientRepository.GetByIdAsync(new object[] { id });
            //    if (patient is null) return NotFound();

            //    return Ok(patient);
            //}

            //// اختيارية: POST api/patients
            //[HttpPost]
            //public async Task<ActionResult> Create(Patient patient)
            //{
            //    await _patientRepository.AddAsync(patient);
            //    return CreatedAtAction(nameof(Get), new { id = patient.Id }, patient);
            //}

            //// اختيارية: PUT api/patients/{id}
            //[HttpPut("{id:int}")]
            //public async Task<IActionResult> Update(int id, Patient patient)
            //{
            //    if (id != patient.Id)
            //        return BadRequest();

            //    _patientRepository.Update(patient);
            //    return NoContent();
            //}

            //// اختيارية: DELETE api/patients/{id}
            //[HttpDelete("{id:int}")]
            //public async Task<IActionResult> Delete(int id)
            //{
            //    var deleted = await _patientRepository.DeleteAsync(id);
            //    if (!deleted) return NotFound();

            //    return NoContent();
            //}
    }   }
}
