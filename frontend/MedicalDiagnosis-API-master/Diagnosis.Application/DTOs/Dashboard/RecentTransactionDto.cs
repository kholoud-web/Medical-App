namespace Diagnosis.Application.DTOs.Dashboard
{
    public class RecentTransactionDto
    {
        public string? TransactionId { get; set; }
        public string? PatientName { get; set; }
        public string? SessionType { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Status { get; set; }
    }
}

