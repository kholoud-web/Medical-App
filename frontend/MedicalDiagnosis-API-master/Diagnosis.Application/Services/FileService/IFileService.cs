using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.Services.FileService
{
    public interface IFileService
    {
        Task<string> UploadFileAsync(IFormFile file);
        Task<ICollection<string>> UploadMultipleFilesAsync(ICollection<IFormFile> files);
        Task<byte[]> GetFileAsync(string path);
        Task<ICollection<byte[]>> GetMultipleFilesAsync(ICollection<string> path);
        Task<bool> DeleteFileAsync(string path);
        bool IsValidFile(IFormFile file);
        Task<string> SaveBase64ImageAsync(string base64String, string? fileName = null);


    }
}
