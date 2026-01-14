using Diagnosis.Application.Interfaces;
using Diagnosis.Application.DTOs.Consultation;



namespace Diagnosis.Application.UseCases.Consultation
{
    public class GetDoctorConsultationsUseCase 
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetDoctorConsultationsUseCase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<ConsultationDTO>> GetDoctorConsultations(string userId)
        {
            var doctorId = await _unitOfWork.Consultation.GetDoctorAsync(userId);
            var consultation = await _unitOfWork.Consultation.GetByDoctorIdAsync(doctorId);

            return consultation.Select(c => new ConsultationDTO
            {
                Id = c.Id,
                PatientName = c.Patient.FName+ " " + c.Patient.LName,
                PatientGender = c.Patient.Gender,
                PatientBirthDate = c.Patient.DateOfBirth,
                Type = c.Type.ToString(),
                Symptoms = c.Symptoms,
                Response = c.Notes,
                Status = c.Status.ToString(),
                RquestDate = c.Date
            }).ToList();
        }

        

    }
}