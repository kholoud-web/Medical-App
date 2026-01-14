using Diagnosis.Application.DTOs.DrugChecker;
using Diagnosis.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Json;

namespace Diagnosis.Infrastructure.Providers;

public class DrugCheckerProvider : IDrugCheckerProvider
{
    private readonly HttpClient _http;
    private readonly string _apiKey;

    public DrugCheckerProvider(HttpClient http, IConfiguration config)
    {
        _http = http;
        _apiKey = config["AiModule:ApiKey"];
    }

    public async Task<DrugCheckerResponceDTO> CheckDrugAsync(DrugCheckerRequestDTO requestDTO)
    {
        //-----------note: replace with actual API endpoint and in appsettings 
        var request = new HttpRequestMessage(
            HttpMethod.Get,
            $"ai/check-drug?name={requestDTO.DrugName}");

        request.Headers.Add("X-API-KEY", _apiKey);

        var response = await _http.SendAsync(request);

        if (!response.IsSuccessStatusCode)
            return new DrugCheckerResponceDTO
            {
                Success = false,
                ErrorMessage = "Error checking drug"
            };

        return await response.Content.ReadFromJsonAsync<DrugCheckerResponceDTO>();
    }

    public async Task<List<DrugSuggestionDTO>> GetSuggestionsAsync(string keyword)
    {
        // TODO: replace url with AI module endpoint
        var request = new HttpRequestMessage(
            HttpMethod.Get,
            $"ai/suggest-drugs?keyword={keyword}");

        request.Headers.Add("X-API-KEY", _apiKey);

        var response = await _http.SendAsync(request);

        if (!response.IsSuccessStatusCode)
            return new List<DrugSuggestionDTO>
            {
                new DrugSuggestionDTO
                {
                    Success = false,
                    ErrorMessage = "Error fetching drug suggestions"
                }
            };
           
        return await response.Content.ReadFromJsonAsync<List<DrugSuggestionDTO>>();
    }
}
