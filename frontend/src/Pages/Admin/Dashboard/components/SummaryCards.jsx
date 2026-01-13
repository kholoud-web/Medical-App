import { FiFileText } from "react-icons/fi";
import { BiInjection } from "react-icons/bi";
import { FaPersonThroughWindow } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";
import { useState } from "react";
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
  const [selectedCard, setSelectedCard] = useState(0);

  const cards = [
    {
      title: "Total Doctors",
      value: `${dashboardData?.totalDoctors || 0}`,
      subtitle: dashboardData?.totalDoctorsChange || "N/A",
      icon: <FiFileText />,
    },
    {
      title: "Active Doctors",
      value: `${dashboardData?.activeDoctors || 0}`,
      subtitle: dashboardData?.activeDoctorsChange || "N/A",
      icon: <BiInjection />,
    },
    {
      title: "Total Patients",
      value: `${dashboardData?.totalPatients || 0}`,
      subtitle: dashboardData?.totalPatientsChange || "N/A",
      icon: <FaPersonThroughWindow />,
    },
    {
      title: "Peak Usage Time",
      value: dashboardData?.peakUsageTime || "N/A",
      subtitle: "Highest system activity window",
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
          onClick={() => setSelectedCard(i)}
          className={`p-6 rounded-2xl border-2 shadow-md transition-all duration-300 cursor-pointer hover:shadow-lg ${
            selectedCard === i
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white border-blue-500'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`font-semibold text-sm mb-2 ${selectedCard === i ? 'text-white' : 'text-neutral-600'}`}>
                {card.title}
              </h3>
              <p className={`text-4xl font-bold mb-2 ${selectedCard === i ? 'text-white' : 'text-blue-500'}`}>
                {card.value}
              </p>
              <p className={`text-xs ${selectedCard === i ? 'text-white' : 'text-neutral-500'}`}>
                {card.subtitle}
              </p>
            </div>
            <div className={`p-3 rounded-full ${selectedCard === i ? 'bg-white/20' : 'bg-blue-500'}`}>
              <span className={`text-2xl ${selectedCard === i ? 'text-white' : 'text-white'}`}>{card.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
