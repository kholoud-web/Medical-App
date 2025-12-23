import SummaryCards from "./components/SummaryCards";
import ChartsSection from "./components/ChartsSection";
import InquiriesTable from "./components/Inquiries";

export default function PatientDashboard() {
  return (
    <div className="p-6 space-y-6 min-h-screen">
      <SummaryCards />
      <ChartsSection />
      <InquiriesTable />
    </div>
  );
}
