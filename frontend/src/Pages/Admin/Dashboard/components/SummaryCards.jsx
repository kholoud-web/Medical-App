import { FiFileText } from "react-icons/fi";
import { BiInjection } from "react-icons/bi";
import { FaPersonThroughWindow } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";
import { useDispatch,useSelector } from "react-redux";
import { fetchAdminDashboard,selectAdminDashboard,selectDashboardError,selectDashboardLoading } from "@/RiduxToolkit/Slices/AdminDashboard";

// const cards = [
//   {
//     title: "Medical Files",
//     value: "12 Files Uploaded",
//     subtitle: "Last Update - Nov 20",
//     icon: <FiFileText />,
//   },
//   {
//     title: "Drug Checker",
//     value: "0 Conflicts",
//     subtitle: "All medications are safe",
//     icon: <BiInjection />,
//   },
//   {
//     title: "Physiotherapy",
//     value: "3 New AI Sessions",
//     subtitle: "Scheduled this week",
//     icon: <FaPersonThroughWindow />,
//   },
//   {
//     title: "Inquiries",
//     value: "2 Pending",
//     subtitle: "Awaiting doctor response",
//     icon: <TiMessages />,
//   },
// ];

export default function SummaryCards() {
  const dispatch = useDispatch();
  const dashboardData = useSelector(selectAdminDashboard);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);



  // Extract data from API response with fallbacks
  const medicalFiles = dashboardData?.medicalFiles || {};
  const drugChecker = dashboardData?.drugChecker || {};
  const physiotherapy = dashboardData?.physiotherapy || {};
  const inquiries = dashboardData?.inquiries || {};

  const cards = [
    {
      title: "Medical Files",
      value: `${medicalFiles.count || 0} Files Uploaded`,
      subtitle: medicalFiles.lastUpdate || "No updates yet",
      icon: <FiFileText />,
    },
    {
      title: "Drug Checker",
      value: `${drugChecker.conflicts || 0} Conflicts`,
      subtitle: drugChecker.conflicts === 0 
        ? "All medications are safe" 
        : "Check medications",
      icon: <BiInjection />,
    },
    {
      title: "Physiotherapy",
      value: `${physiotherapy.newSessions || 0} New AI Sessions`,
      subtitle: physiotherapy.scheduled || "No sessions scheduled",
      icon: <FaPersonThroughWindow />,
    },
    {
      title: "Inquiries",
      value: `${inquiries.pending || 0} Pending`,
      subtitle: inquiries.pending > 0 
        ? "Awaiting doctor response" 
        : "No pending inquiries",
      icon: <TiMessages />,
    },
  ];

  // Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 rounded-xl border bg-treat-bg-Gray border-primary-blue/50 animate-pulse"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="h-5 bg-gray-300 rounded w-1/2"></div>
              <div className="h-6 w-6 bg-gray-300 rounded"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-semibold mb-2">
          Failed to load summary data
        </p>
        <p className="text-sm text-red-500 mb-4">{error}</p>
        <button
          onClick={() => dispatch(fetchAdminDashboard())}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
        >
          Retry
        </button>
      </div>
    );
  }
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="p-4 rounded-xl border bg-treat-bg-Gray hover:bg-primary-blue hover:text-white hover:shadow-md duration-300 transition-colors cursor border-primary-blue/50"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{card.title}</h3>
            <span className="text-xl">{card.icon}</span>
          </div>
          <p className="mt-2 font-bold">{card.value}</p>
          <p className="text-sm opacity-80">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
