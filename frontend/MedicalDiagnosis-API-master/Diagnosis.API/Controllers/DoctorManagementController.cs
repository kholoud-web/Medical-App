using Diagnosis.Application.DTOs.DoctorManagement;
using Diagnosis.Application.DTOs.Profile;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.UseCases.Auth;
using Diagnosis.Domain.Entites;
using Diagnosis.Infrastracture.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Diagnosis.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DoctorManagementController: ControllerBase
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<DoctorManagementController> _logger;
        public DoctorManagementController(IUnitOfWork unitOfWork, ILogger<DoctorManagementController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-doctor")]
        public async Task<IActionResult> AddDoctor(
            [FromServices] AddDoctorUseCase addDoctorUseCase,
            [FromBody] AddDoctorDTO addDoctorDTO
            )
        {
            var result = await addDoctorUseCase.ExecuteAsync(addDoctorDTO);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }



        [HttpGet("{id}")]
        [ProducesResponseType(typeof(DoctorProfileDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetDoctorProfile(int id)
        {
            try
            {
                var doctor = await _unitOfWork.Doctor.GetDoctorProfileAsync(id);

                if (doctor == null)
                {
                    _logger.LogWarning($"Doctor with ID {id} not found");
                    return NotFound(new { message = "الطبيب غير موجود" });
                }

                return Ok(doctor);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving doctor profile for ID {id}");
                return StatusCode(500, new { message = "حدث خطأ في النظام" });
            }
        }


        //private readonly IDoctorManagement _doctorRepository;

        //public DoctorsController(IDoctorManagement doctorRepository)
        //{
        //    _doctorRepository = doctorRepository;
        //}

     

        //public async Task<ActionResult<IEnumerable<DoctorProfileDto>>> GetAll()
        //{
        //    // نستخدم Query عشان نعمل Include للـ User
        //    var doctors = await _doctorRepository.Query()
        //        .Include(d => d.User)
        //        .ToListAsync();

        //    var result = doctors.Select(d => new DoctorProfileDto
        //    {
        //        Id = d.Id,
        //        FullName = d.FName + " " + d.LName,        // من Doctor
        //        Email = d.User.Email,                      // من ApplicationUser
        //        PhoneNumber = d.User.PhoneNumber,          // من ApplicationUser
        //                                                   //Gender = d.User.Gender,                    // من ApplicationUser
        //                                                   // NationalId = d.User.NationalId,            // من ApplicationUser
        //                                                   // DateOfBirth = d.User.DateOfBirth,          // من ApplicationUser
        //                                                   // Address = d.User.Address,                  // من ApplicationUser (لو موجودة)
        //        Specialization = d.Specialization,         // من Doctor
        //        IsActive = d.User.LockoutEnd == null       // مثال: Active لو مش مقفول
        //    });

        //    return Ok(result);
        //}

        //// GET api/doctors/{id}/profile
        //[HttpGet("{id:int}/profile")]
        //public async Task<ActionResult<DoctorProfileDto>> GetProfile(int id)
        //{
        //    var doc = await _doctorRepository.GetByIdAsync(new object[] { id });
        //    if (doc is null) return NotFound();

        //    var dto = new DoctorProfileDto
        //    {
        //        Id = doc.Id,
        //        FullName = doc.FName, // or doc.FullName if available
        //        Email = doc.User?.Email,
        //        PhoneNumber = doc.User?.PhoneNumber, // Fix: get PhoneNumber from User
        //                                             // Gender = doc.User?.Gender, // If Gender is on User, else doc.Gender if present
        //                                             //NationalId = doc.User?.NationalId, // If NationalId is on User, else doc.NationalId if present
        //                                             //  DateOfBirth = doc.User?.DateOfBirth, // If DateOfBirth is on User, else doc.DateOfBirth if present
        //                                             //Address = doc.User?.Address, // If Address is on User, else doc.Address if present
        //        Specialization = doc.Specialization,
        //        IsActive = doc.User != null // or another property indicating active status
        //    };

        //    return Ok(dto);
        //    //}
    }   
}

