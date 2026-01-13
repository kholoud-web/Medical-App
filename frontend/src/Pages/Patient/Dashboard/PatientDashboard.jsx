import SummaryCards from "./components/SummaryCards";
import ChartsSection from "./components/ChartsSection";
import InquiriesTable from "./components/Inquiries";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTopSymptomsThisWeek,
  selectDashboardLoading,
  selectTopSymptom,
  fetchRecentInquiries,
  fetchPendingInquiriesCount,
  fetchSymptomCountThisWeek,
} from "@/RiduxToolkit/Slices/patientDashboardSlice";

export default function PatientDashboard() {
  const dispatch = useDispatch();
  const topSymptom = useSelector(selectTopSymptom);
  const loading = useSelector(selectDashboardLoading);

useEffect(() => {
  dispatch(fetchRecentInquiries());
  dispatch(fetchPendingInquiriesCount());
  dispatch(fetchSymptomCountThisWeek());
  dispatch(fetchTopSymptomsThisWeek());
}, [dispatch]);
  return (
    <div className="p-6 space-y-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Patient Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's your health overview
          </p>
        </div>

        {/* Top Symptom Badge */}
        {loading.topSymptom ? (
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-blue"></div>
            <span className="text-sm">Loading top symptom...</span>
          </div>
        ) : topSymptom ? (
          <div className="px-4 py-2 bg-gradient-to-r from-primary-blue to-blue-600 text-white rounded-lg shadow-md">
            <p className="text-xs opacity-90">Top Symptom This Week</p>
            <p className="font-bold text-lg">{topSymptom}</p>
          </div>
        ) : null}
      </div>
      <SummaryCards />
      <ChartsSection />
      <InquiriesTable />
    </div>
  );
}
