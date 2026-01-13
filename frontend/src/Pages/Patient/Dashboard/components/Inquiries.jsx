import {
  fetchRecentInquiries,
  selectDashboardErrors,
  selectDashboardLoading,
  selectRecentInquiries
} from "@/RiduxToolkit/Slices/patientDashboardSlice";
import {  useSelector ,useDispatch} from "react-redux";

// const inquiries = [
//   {
//     doctor: "Dr. Ali Sameh",
//     subject: "Headache and Dizziness",
//     date: "2025/11/20",
//     time: "10:00 AM",
//     status: "confirmed",
//   },
//   {
//     doctor: "Dr. Sarah Ahmed",
//     subject: "Prescription Renewal",
//     date: "2025/12/2",
//     time: "11:15 AM",
//     status: "confirmed",
//   },
//   {
//     doctor: "Dr. Karam Adel",
//     subject: "Medication Side Effects",
//     date: "2025/11/25",
//     time: "2:30 PM",
//     status: "pending",
//   },
// ];

function InquiriesTable() {
  const dispatch = useDispatch();
  const inquiries = useSelector(selectRecentInquiries);
  const loading = useSelector(selectDashboardLoading);
  const errors = useSelector(selectDashboardErrors);

 

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "/");
  };

  // Format time helper
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Loading State
  if (loading.recentInquiries) {
    return (
      <div className="bg-treat-bg-Gray p-4 rounded-xl border border-primary-blue/50">
        <h3 className="font-semibold mb-1">Inquiries Overview</h3>
        <p className="text-sm text-gray-500 mb-4">Your scheduled inquiries</p>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
          <span className="ml-2">Loading inquiries...</span>
        </div>
      </div>
    );
  }

  // Error State
  if (errors.recentInquiries) {
    return (
      <div className="bg-treat-bg-Gray p-4 rounded-xl border border-primary-blue/50">
        <h3 className="font-semibold mb-1">Inquiries Overview</h3>
        <p className="text-sm text-gray-500 mb-4">Your scheduled inquiries</p>
        <div className="flex flex-col items-center justify-center h-64 text-red-500">
          <p className="font-semibold">Error loading inquiries</p>
          <p className="text-sm">{errors.recentInquiries}</p>
          <button
            onClick={() => dispatch(fetchRecentInquiries())}
            className="mt-4 px-4 py-2 bg-primary-blue text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (inquiries.length === 0) {
    return (
      <div className="bg-treat-bg-Gray p-4 rounded-xl border border-primary-blue/50">
        <h3 className="font-semibold mb-1">Inquiries Overview</h3>
        <p className="text-sm text-gray-500 mb-4">Your scheduled inquiries</p>
        <div className="flex items-center justify-center h-64 text-gray-400">
          <p>No inquiries found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-treat-bg-Gray p-4 rounded-xl border border-primary-blue/50">
      <h3 className="font-semibold mb-1">Inquiries Overview</h3>
      <p className="text-sm text-gray-500 mb-4">Your scheduled inquiries</p>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-2 px-2">Doctor Name</th>
              <th className="text-center py-2 px-2">Subject</th>
              <th className="text-center py-2 px-2">Date</th>
              <th className="text-center py-2 px-2">Time</th>
              <th className="text-center py-2 px-2">Status</th>
              <th className="text-center py-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="py-3 px-2 text-left">{item.doctor}</td>
                <td className="py-3 px-2 text-center">{item.subject}</td>
                <td className="py-3 px-2 text-center">{item.date}</td>
                <td className="py-3 px-2 text-center">{item.time}</td>
                <td className="py-3 px-2 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.status.toLowerCase() === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : item.status.toLowerCase() === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex gap-2 justify-center">
                    <button className="px-2 py-1 border rounded hover:bg-primary-blue hover:text-white transition-all duration-200 text-xs">
                      Details
                    </button>
                    <button className="px-2 py-1 text-red-500 hover:drop-shadow-lg text-xs">
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {inquiries.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">
                  {item.doctorName}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {item.subject || "NA"}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                  item.status === "confirmed"
                    ? "bg-green-100 text-green-600"
                    : item.status.toLowerCase() === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {item.status}
              </span>
            </div>
            <div className="flex flex-col gap-1 mb-3 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-medium">Date:</span>
                <span>{formatDate(item.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Time:</span>
                <span>{formatTime(item.time)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 border rounded hover:bg-primary-blue hover:text-white transition-all duration-200 text-xs font-medium">
                Details
              </button>
              <button className="flex-1 px-3 py-2 text-red-500 border border-red-500 rounded hover:bg-red-50 transition-all duration-200 text-xs font-medium">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default InquiriesTable;
