using Diagnosis.Application.DTOs.Auth;
using Diagnosis.Application.DTOs.DoctorManagement;
using Diagnosis.Application.DTOs.SystemSettings;
using Diagnosis.Application.Interfaces;
using Diagnosis.Application.Services.EmailService;
using Diagnosis.Domain.Entites;
using Diagnosis.Domain.Models.Entites;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using MimeKit.Encodings;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Infrastracture.Repositories
{
    public class AuthRepository : IAuth
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IJwtTokenGenerator jwtTokenGenerator;
        private readonly IEmailSender emailSender;
        private readonly ApplicationDbContext _context;
        public AuthRepository(UserManager<ApplicationUser> userManager, IJwtTokenGenerator jwtTokenGenerator, IEmailSender emailSender, ApplicationDbContext context)
        {
            this.userManager = userManager;
            this.jwtTokenGenerator = jwtTokenGenerator;
            this.emailSender = emailSender;
            _context = context;
        }

        public async Task<RegisterResponse> RegisterAsync(RegisterDTO registerDTO)
        {
            if (registerDTO.Email == null)
            {
                return new RegisterResponse
                {
                    Success = false,
                    ErrorMessage = "Invalid Email"
                };
            }
            ApplicationUser? user = null;

            try
            {
                user = new ApplicationUser
                {
                    Email = registerDTO.Email,
                    UserName = registerDTO.UserName,
                    PhoneNumber = registerDTO.PhoneNumber
                };
                var result = await userManager.CreateAsync(user, registerDTO.Password!);

                if (!result.Succeeded)
                {
                    return new RegisterResponse
                    {
                        Success = false,
                        ErrorMessage = string.Join(", ", result.Errors.Select(e => e.Description))
                    };
                }
                if (string.IsNullOrEmpty(user.Id))
                {
                    return new RegisterResponse
                    {
                        Success = false,
                        ErrorMessage = "User ID is null after creation"
                    };
                }

                await userManager.AddToRoleAsync(user, "Patient");

            var patient = new Patient
            {
                UserId = user.Id,
                FName = registerDTO.FName!,
                LName = registerDTO.LName!,
                Gender = registerDTO.Gender!,
                DateOfBirth = registerDTO.BirthDate
                };

                await _context.Patients.AddAsync(patient);
                await _context.SaveChangesAsync();
            }
                catch (Exception ex)
                {
                    if (user != null)
                        await userManager.DeleteAsync(user);

                      var errorMessage = ex.InnerException != null
                            ? ex.InnerException.Message
                            : ex.Message;

                    return new RegisterResponse
                    {
                        Success = false,
                        ErrorMessage = "Error: " + errorMessage + " | StackTrace: " + ex.StackTrace
                    };
                }

                    await SendConfirmationEmail(user, registerDTO.ClientUri!);
                    return new RegisterResponse
                    {
                        Success = true,
                        ErrorMessage = "Check your Email for Confirmation"
                    };
            }
            

        public async Task<AddDoctorRespose> AddDoctorAsync(AddDoctorDTO addDoctorDTO)
        {
            if (addDoctorDTO == null)
            {
                return new AddDoctorRespose
                {
                    Success = false,
                    Message = "Doctor's Details cannot be null"
                };
            }
            ApplicationUser? user = null;

            try
            {
                user = new ApplicationUser
                {
                    Email = addDoctorDTO.Email,
                    UserName = addDoctorDTO.UserName,
                    PhoneNumber = addDoctorDTO.PhoneNumber
                };

                var result = await userManager.CreateAsync(user, addDoctorDTO.Password!);
                if (!result.Succeeded)
                {
                    return new AddDoctorRespose
                    {
                        Success = false,
                        Message = "Doctor user creation failed"
                    };
                }
                await userManager.AddToRoleAsync(user ,"Doctor");

                var doctor = new Doctor
                {
                    UserId = user.Id,
                    ExperienceYears = addDoctorDTO.ExperienceYears,
                    NationalId = addDoctorDTO.NationalId,
                    BirhDate = addDoctorDTO.BirhDate,
                    Address = addDoctorDTO.Address,
                    Gender = addDoctorDTO.Gender
                };


                await _context.Doctors.AddAsync(doctor);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                return new AddDoctorRespose
                {
                    Success = false,
                    Message = "Error while adding Doctor Data: " + ex.Message
                };
            }
            await SendConfirmationEmail(user, addDoctorDTO.ClientUri!);
            return new AddDoctorRespose
            {
                Success = true,
                Message = "Doctor was added successfully, please notify him to check for Confirmation Email"
            };
        }

        public async Task<AddAdminResponse> AddAdminAsync(AddAdminDTO addAdminDTO)
        {
            if (addAdminDTO == null)
            {
                return new AddAdminResponse
                {
                    Success = false,
                    Message = "Admin's Details cannot be null"
                };
            }
            ApplicationUser? user = null;
            try
            {
                user = new ApplicationUser
                {
                    UserName = addAdminDTO.UserName,
                    Email = addAdminDTO.Email,
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(user, addAdminDTO.Password!);
                if (!result.Succeeded)
                {
                    return new AddAdminResponse
                    {
                        Success = false,
                        Message = string.Join(", ", result.Errors.Select(e => e.Description))
                    };
                }
                await userManager.AddToRoleAsync(user, "Admin");
            }
            catch (Exception ex)
            {
                return new AddAdminResponse
                {
                    Success = false,
                    Message = "Error while adding Admin Data: " + ex.Message
                };
            }

            return new AddAdminResponse
            {
                Success = true,
                Message = "Admin user was added successfully"
            };
        }
        public async Task SendConfirmationEmail(ApplicationUser user, string clientUri)
        {
            var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var param = new Dictionary<string, string?>
            {
                { "token", encodedToken},
                { "email", user.Email!}
            };

            var callBackUrl = QueryHelpers.AddQueryString(clientUri, param);

            var assembly = Assembly.Load("Diagnosis.Application");
            using var  stream = assembly.GetManifestResourceStream("Diagnosis.Application.Template.ConfirmEmail.html");
            
            if (stream == null) throw new Exception("stream file of Email template is not correct");

            using var reader = new StreamReader(stream);
            var htmlTemplate = await reader.ReadToEndAsync();

            var html = htmlTemplate.Replace("{{CallbackUrl}}", callBackUrl);

            var message = new Message(
                new string[] { user.Email! },
                "Confirm your Email",
                html);

            await emailSender.SendEmailAsync(message);
        }
        public async Task<RegisterResponse> ConfirmEmailAsync(ConfirmEmailDTO confirmEmailDTO)
        {
            if (confirmEmailDTO.Email == null) throw new ArgumentNullException(nameof(confirmEmailDTO.Email));
            if (confirmEmailDTO.Token == null) throw new ArgumentNullException(nameof(confirmEmailDTO.Token));

            var user = await userManager.FindByEmailAsync(confirmEmailDTO.Email);
            if (user == null) return new RegisterResponse { Success = false, ErrorMessage = "user Doesn't Exist" };

            try
            {
                var decodedToken = Encoding.UTF8.GetString(
                    WebEncoders.Base64UrlDecode(confirmEmailDTO.Token)
                );

                var result = await userManager.ConfirmEmailAsync(user, decodedToken);

                if (!result.Succeeded)
                {
                    return new RegisterResponse
                    {
                        Success = false,
                        ErrorMessage = string.Join(", ", result.Errors.Select(e => e.Description))
                    };
                }

                return new RegisterResponse
                {
                    Success = true,
                    ErrorMessage = "Email confirmed successfully"
                };
            }
            catch (Exception ex)
            {
                return new RegisterResponse
                {
                    Success = false,
                    ErrorMessage = $"Invalid token format: {ex.Message}"
                };
            }
        }
        public async Task<LoginResponseDTO> LoginAsync(string email, string password, string clientUri)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return (new LoginResponseDTO
                {
                    Success = false,
                    ErrorMessage = "Invalid email or password"
                });
            }

            var roles = await userManager.GetRolesAsync(user);

            if (!await userManager.IsEmailConfirmedAsync(user))
            {
                await SendConfirmationEmail(user, clientUri);
                {
                    return new LoginResponseDTO
                    {
                        Success = false,
                        ErrorMessage = "Email is not confirmed. Please check your inbox."
                    };
                }
            }

            var isPasswordValid = await userManager.CheckPasswordAsync(user, password);
            if (!isPasswordValid)
            {
                return (new LoginResponseDTO
                {
                    Success = false,
                    ErrorMessage = "Invalid email or password"
                });
            }
     
            var (token, expiresAt) = await jwtTokenGenerator.GenerateTokenAsync(user, roles);


            return new LoginResponseDTO
            {
                Token = token,
                ExpiresAt = expiresAt
            };

        }

        public async Task<IdentityResult> ChangePasswordAsync(string userId, string currentPassword, string newPassword)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found" });
            }

            return await userManager.ChangePasswordAsync(user, currentPassword, newPassword);
        }

        public async Task<ApplicationUser> GetUserByIdAsync(string userId)
        {
            var result = await userManager.FindByIdAsync(userId!);
            if (result == null) throw new ArgumentNullException("Invalid userId");
            return result;
        }

        public async Task<ForgotPasswordResponseDTO> ForgotPasswordAsync(ForgotPasswordDTO forgotPasswordDTO)
        {
            var user = await userManager.FindByEmailAsync(forgotPasswordDTO.Email!);
            if (user == null)
            {
                throw new Exception($"User with email {forgotPasswordDTO.Email} not found");
            }

            
            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));


            if (!string.IsNullOrEmpty(forgotPasswordDTO.ClientUri))
            {
                var param = new Dictionary<string, string?>
                {
                    { "token", encodedToken },
                    { "email", forgotPasswordDTO.Email! }
                };

                string callbackUrl = QueryHelpers.AddQueryString(forgotPasswordDTO.ClientUri, param);

                #region Read Html file
                var assembly = Assembly.Load("Diagnosis.Application");
                using var stream = assembly.GetManifestResourceStream("Diagnosis.Application.Template.ResetEmail.html");

                if (stream == null) throw new Exception("stream file of Email template is not correct");

                using var reader = new StreamReader(stream);
                var htmlTemplate = await reader.ReadToEndAsync();
                #endregion

                var html = htmlTemplate.Replace("{{CallbackUrl}}", callbackUrl);

                    var message = new Message(
                        new string[] { user.Email! },
                        "Reset Password Token",
                        html
                    );

                await emailSender.SendEmailAsync(message);

                return new ForgotPasswordResponseDTO
                {
                    Success = true
                };
            }

            return new ForgotPasswordResponseDTO
            {
                Success = false,
                Message = "Email with reset token hasn't sent"
            };
        }


        public async Task<ResetPasswordResponseDTO> ResetPasswordAsync(ResetPasswordDTO resetPasswordDTO)
        {
            
            var user = await userManager.FindByEmailAsync(resetPasswordDTO.Email!);
            if (user == null)
            {
                return new ResetPasswordResponseDTO
                {
                    Success = false,
                    Message = "User not found.",
                    Errors = new List<string> { "Invalid email." }
                };
            }

            
            if (string.IsNullOrEmpty(resetPasswordDTO.Token))
            {
                return new ResetPasswordResponseDTO
                {
                    Success = false,
                    Message = "Token is required.",
                    Errors = new List<string> { "Token cannot be empty." }
                };
            }

            
            string token = resetPasswordDTO.Token;
            var decodedToken = Encoding.UTF8.GetString(
                      WebEncoders.Base64UrlDecode(token)
);

            var resetPassResult = await userManager.ResetPasswordAsync(
                user,
                decodedToken,
                resetPasswordDTO.Password!
            );

            
            if (!resetPassResult.Succeeded)
            {
                return new ResetPasswordResponseDTO
                {
                    Success = false,
                    Message = "Failed to reset password.",
                    Errors = resetPassResult.Errors.Select(e => e.Description).ToList()
                };
            }

            
            return new ResetPasswordResponseDTO
            {
                Success = true,
                Message = "Password has been reset successfully."
            };
        }
    }
}
