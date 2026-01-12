import SummaryCards from "./components/SummaryCards";
import ChartsSection from "./components/ChartsSection";
import InquiriesTable from "./components/Inquiries";
import { useEffect } from "react";
import { fetchAdminDashboard } from "@/RiduxToolkit/Slices/AdminDashboard";
import { useDispatch } from "react-redux";



export default function AdminDashboard() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAdminDashboard());
  },[dispatch])
  
  return (
    <div className="p-6 space-y-6 min-h-screen">
      <SummaryCards />
      <ChartsSection />
      <InquiriesTable />
    </div>
  );
}
