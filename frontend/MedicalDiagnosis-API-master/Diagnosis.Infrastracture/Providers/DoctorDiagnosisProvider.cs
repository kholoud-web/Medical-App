using Diagnosis.Application.DTOs.DoctorDiagnosis;
using Diagnosis.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Diagnosis.Infrastracture.Providers
{
    public class DoctorDiagnosisProvider: IDoctorDiagnosisProvider
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly ApplicationDbContext _context;
        public DoctorDiagnosisProvider(
            HttpClient httpClient, 
            IConfiguration config, 
            ApplicationDbContext context
            )
        {
            _httpClient = httpClient;
            _apiKey = config["AiModule:ApiKey"];
            _context = context;
        }

        public async Task<DoctorDiagnosisResponse> GetDoctorDiagnosisAsync(GetDoctorDiagnosisDTO getDoctorDiagnosisDTO)
        {
            var request = new HttpRequestMessage(
                            HttpMethod.Post,
                            "ai-Url");

            request.Headers.Add("X-API-KEY", _apiKey);

            request.Content = new StringContent(
                JsonSerializer.Serialize(getDoctorDiagnosisDTO),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode) throw new Exception("Error with AI Doctor Diagnosis");

            var result =  await response.Content.ReadFromJsonAsync<DoctorDiagnosisResponse>();

            if (result == null) throw new Exception("AI API returned null response");

            return result;
        }

        public async Task<DoctorDiagnosisResponse> GetTemplateAsync(int templateId)
        {
            var diagnosis = await _context.Diagnosises.Include(c => c.Symptoms)
                                    .Include(d => d.ClinicalFindings)
                                    .Include(e => e.SuggestedMedications)
                                    .FirstOrDefaultAsync(c => c.Id == templateId);

            if (diagnosis == null)
            {
                return new DoctorDiagnosisResponse
                {
                    Success = false,
                    Message = "Error with fetching template"
                };
            }

            var diagnosisDTO = new DoctorDiagnosisResponse
            {
                Name = diagnosis.Name,
                Symptoms = diagnosis.Symptoms!
                            .Select(n => n.Name)
                            .ToList()!,

                ClinicalFindings = diagnosis.ClinicalFindings!.Select(c => new ClinicalFindingResponse
                {
                    Name = c.Name,
                    Notes = c.Notes,
                    Value = c.Value
                }).ToList(),

                SuggestedMedications = diagnosis.SuggestedMedications!.Select(d => new SuggestedMedicationResponse
                {
                    Name = d.Name,
                    Dosage = d.Dosage,
                    Frequency = d.Frequency
                }).ToList()
            };

            return diagnosisDTO;
        }
        
        public async Task<ICollection<TemplatesResponse>> GetTemplatesAsync()
        {
            var templates = await _context.Diagnosises.AsNoTracking()
                                .Select(c => new TemplatesResponse
                                {
                                    TemplateId = c.Id,
                                    Name = c.Name!
                                })
                                .ToListAsync();

            if (templates == null) throw new Exception("No Templates found");
            return templates;
        }
    }
}
