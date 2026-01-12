import BarChar from "@/components/Doctor/Dashborad/BarChar";
import StatsChart from "@/components/Doctor/Dashborad/StatsChart";
import { useSelector } from "react-redux";
import {
  selectDashboardErrors,
  selectSymptomCount,
  selectDashboardLoading,
} from "@/RiduxToolkit/Slices/patientDashboardSlice";

function ChartsSection() {
  const symptomCount = useSelector(selectSymptomCount);
  const loading = useSelector(selectDashboardLoading);
  const errors = useSelector(selectDashboardErrors);


  const chartData = symptomCount
    ? Object.entries(symptomCount).map(([day, count]) => ({
        day,
        count,
      }))
    : [];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="bg-treat-bg-Gray p-4 rounded-xl border border-primary-blue/50">
        <h3 className="font-semibold mb-2">Treatment Progress Overview</h3>
        <p className="text-sm text-gray-500 mb-4">Last 6 Months</p>
        <div className="h-64">
          <StatsChart />
        </div>
      </div>

      <div className="bg-treat-bg-Gray p-4 rounded-xl border border-primary-blue/50">
        <h3 className="font-semibold mb-2">Symptom Severity Trends</h3>
        <p className="text-sm text-gray-500 mb-4">Current Week</p>
        <div className="h-64 flex items-center justify-center text-gray-400 border-primary-blue/50">
          {loading.symptomCount ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
              <span className="ml-2">Loading...</span>
            </div>
          ) : errors.symptomCount ? (
            <div className="text-red-500 text-center">
              <p>Error loading symptom data</p>
              <p className="text-sm">{errors.symptomCount}</p>
            </div>
          ) : chartData.length > 0 ? (
            <BarChar show={true} data={chartData} />
          ) : (
            <p>No symptom data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default ChartsSection;
