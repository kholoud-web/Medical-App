import BarChar from "@/components/Doctor/Dashborad/BarChar";
import StatsChart from "@/components/Doctor/Dashborad/StatsChart";
import { useDispatch,useSelector } from "react-redux";
import { fetchAdminDashboard , selectAdminDashboard,selectDashboardLoading,selectDashboardError } from "@/RiduxToolkit/Slices/AdminDashboard";


function ChartsSection() {

  const dispatch = useDispatch();
  const  dashboardData = useSelector(selectAdminDashboard);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);

 //Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-treat-bg-Gray p-4 rounded-xl border border-primary-blue/50 animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-treat-bg-Gray p-4 rounded-xl border border-primary-blue/50 animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="col-span-full bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 font-semibold mb-2">
            Failed to load dashboard data
          </p>
          <p className="text-sm text-red-500 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchAdminDashboard())}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="bg-treat-bg-Gray p-4 rounded-xl border border-primary-blue/50">
        <h3 className="font-semibold mb-2">
          Treatment Progress Overview
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Last 6 Months
        </p>
        <div className="h-64">
          <StatsChart data={dashboardData}/>
        </div>
      </div>

      <div className="bg-treat-bg-Gray p-4 rounded-xl border border-primary-blue/50">
        <h3 className="font-semibold mb-2">
          Symptom Severity Trends
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Current Week
        </p>
        <div className="h-64 flex items-center justify-center text-gray-400 border-primary-blue/50">
            <BarChar show={false} data={dashboardData}/>
        </div>
      </div>
    </div>
  );
}
export default ChartsSection;