using Diagnosis.API.Attributes;
using Diagnosis.Application.Interfaces;
using System.Security.Claims;

namespace Diagnosis.API.Middlewares
{
    public class AiEnablingMiddleware
    {
        private readonly RequestDelegate _next;

        public AiEnablingMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task InvokeAsync(
            HttpContext context,
            IUnitOfWork unitOfWork)
        {
            var endpoint = context.GetEndpoint();

            if (endpoint == null)
            {
                await _next(context);
                return;
            }

            var aiMeta = endpoint.Metadata.GetMetadata<AiEndpointAttribute>();
            var diagnosisMeta = endpoint.Metadata.GetMetadata<DiagnosisAttribute>();

            if (aiMeta == null && diagnosisMeta == null)
            {
                await _next(context);
                return;
            }

            if (aiMeta != null || diagnosisMeta != null)
            {
                if (!await unitOfWork.systemSettings.IsAiEnabledAsync())
                {
                    context.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
                    await context.Response.WriteAsync("AI Feature Disabled");
                    return;
                }
            }

            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("User not authenticated");
                return;
            }

            if (aiMeta != null)
            {
                if (!await unitOfWork.systemSettings.CanUseAiAsync(userId))
                {
                    context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
                    await context.Response.WriteAsync("AI usage limit exceeded");
                    return;
                }
            }

            if (diagnosisMeta != null)
            {
                if (!await unitOfWork.systemSettings.CanMakeDiagnosisAsync(userId))
                {
                    context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
                    await context.Response.WriteAsync("Diagnosis limit exceeded");
                    return;
                }
            }

            await _next(context);
        }
    }
}
