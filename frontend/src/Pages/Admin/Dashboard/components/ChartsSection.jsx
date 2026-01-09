import BarChar from "@/components/Doctor/Dashborad/BarChar";
import StatsChart from "@/components/Doctor/Dashborad/StatsChart";


function ChartsSection() {
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
          <StatsChart/>
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
            <BarChar show={false}/>
        </div>
      </div>
    </div>
  );
}
export default ChartsSection;