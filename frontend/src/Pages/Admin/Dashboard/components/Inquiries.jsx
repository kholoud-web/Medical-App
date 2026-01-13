import { useDispatch,useSelector } from "react-redux";
import { fetchAdminDashboard, selectAdminDashboard,selectDashboardLoading,selectDashboardError } from "@/RiduxToolkit/Slices/AdminDashboard";

function InquiriesTable() {

  const dispatch = useDispatch();
  const dashboardData = useSelector(selectAdminDashboard);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);
  
  const recentDiagnoses = dashboardData?.recentDiagnoses || [];


  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-md">
      <h3 className="font-bold text-lg text-neutral-800 mb-1">Recent Diagnoses</h3>
      <p className="text-sm text-neutral-500 mb-4">
        Your scheduled Diagnoses
      </p>

      {loading && (
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600 font-semibold mb-2">
            Failed to load diagnoses
          </p>
          <p className="text-sm text-red-500 mb-3">{error}</p>
          <button
            onClick={() => dispatch(fetchAdminDashboard())}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && recentDiagnoses.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>No recent diagnoses found</p>
        </div>
      )}

      {!loading && !error && recentDiagnoses.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-neutral-200">
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Patient Name</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Diagnosis Type</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Provider</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentDiagnoses.map((item, i) => (
                <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-4 text-neutral-800 font-medium">{item.patientName}</td>
                  <td className="py-4 px-4 text-neutral-700">Type 2 Diabetes</td>
                  <td className="py-4 px-4 text-neutral-600">
                    {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  </td>
                  <td className="py-4 px-4 text-neutral-600">{item.time}</td>
                  <td className="py-4 px-4 text-neutral-700">{item.provider}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-semibold ${
                      item.status.toLowerCase() === 'confirmed' || item.status.toLowerCase() === 'completed' 
                        ? 'bg-green-100 text-green-700' :
                      item.status.toLowerCase() === 'pending' 
                        ? 'bg-yellow-100 text-yellow-700' :
                      'bg-neutral-100 text-neutral-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default InquiriesTable;