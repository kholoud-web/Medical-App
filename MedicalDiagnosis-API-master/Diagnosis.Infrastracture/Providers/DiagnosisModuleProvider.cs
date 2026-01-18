using Diagnosis.Application.DTOs.DiagnosisModule;
using Diagnosis.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Diagnosis.Infrastracture.Providers
{
    public class DiagnosisModuleProvider : IDiagnosisModuleProvider
    {
        private readonly HttpClient _httpClient;
        public DiagnosisModuleProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<ProviderResponse> GetDiagnosisAsync(IFormFile formFile)
        {
            try
            {
                using var content = new MultipartFormDataContent();

                using var stream = formFile.OpenReadStream();
                var fileContent = new StreamContent(stream);
                fileContent.Headers.ContentType =
                    new MediaTypeHeaderValue(formFile.ContentType);

                content.Add(
                    fileContent,
                    "file",               
                    formFile.FileName
                );

                var response = await _httpClient.PostAsync("predict", content);

                response.EnsureSuccessStatusCode();

                var result = await response.Content
                    .ReadFromJsonAsync<ProviderResponse>();

                if (result == null)
                    throw new Exception("AI API returned null response");

                return result;
            }
            catch (JsonException ex)
            {
                throw new Exception("Failed to parse AI response.", ex);
            }
            catch (HttpRequestException ex)
            {
                throw new Exception("Failed to connect to AI service.", ex);
            }
            catch (TaskCanceledException ex)
            {
                throw new Exception("AI service request timeout.", ex);
            }
        }

    }
}
