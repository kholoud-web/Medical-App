namespace Diagnosis.Application.DTOs.Dashboard
{
    public class DashboardSummaryDto
    {
        public decimal TotalEarnings { get; set; }
        public decimal MonthlyGrowthPercentage { get; set; }
        public decimal PendingWithdrawals { get; set; }
        public int MonthlySessions { get; set; }
        public int? TotalAppointments { get; set; }
        public decimal? TotalRevenue { get; set; }
      
    }
}
