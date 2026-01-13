import EarningsChart from "../../components/Doctor/Dashborad/EarningsChart";
import BarChar from "../../components/Doctor/Dashborad/BarChar";
import CustomFilter from "@/components/Doctor/Dashborad/CustomFilter";
import StatsCard from "@/components/Doctor/Dashborad/StatsCard";
import ChartsCard from "@/components/Doctor/Dashborad/ChartsCard";
import CommonDiagnoses from "@/components/Doctor/Dashborad/CommonDiagnoses";
import React, { useEffect, useState } from "react";
import { getDoctorDashboard } from "./doctorDashboardService";

function Dashboard() {
  const [statsData, setStatsData] = useState([]);
  const [chartsData, setChartsData] = useState([]);
  const [commonDiagnoses, setCommonDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);
 
const fetchDashboard = async () => {
    try {
    const res = await getDoctorDashboard();
    // إذا لم يكن هناك توكن، الـ service سيعيد null
    if (!res) {
      console.warn("No data received (check token)");
      setLoading(false);
      return; 
    }
    console.log("API Response:", res); 
        const data = res.data || res;
      
      if (data) {

        // 🔹 Stats Cards
        setStatsData([
          {
            title: "Consultations",
            value: data.totalConsultations || 0,
            imgSrc: "/consultaions.svg",
          },
          {
            title: "Treatment plans",
            value: data.totalTreatmentPlans || 0,
            imgSrc: "/TreatmentPlans.svg",
          },
        ]);

        // 🔹 Charts
        setChartsData([
          {
            title: "New vs Returning Patients",
            chart: <BarChar data={data.newVsReturningPatients || []} />,
            imgSrc: "/people.svg",
          },
          {
            title: "Rating",
            chart: <EarningsChart type="natural" data={data.ratingStats || []} />,
            imgSrc: "/star.svg",
          },
          {
            title: "Earnings",
            chart: <EarningsChart type="step" data={data.earningsStats || []} />,
            imgSrc: "/money.svg",
          },
        ]);

        // 🔹 Common Diagnoses
        setCommonDiagnoses(data.commonDiagnoses|| []);
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }

    
  };
 useEffect(() => {
    fetchDashboard();
  }, []);
  const [filterOptions, setFilteredOptions] = useState([
    { title: "Daily", active: true },
    { title: "Monthly", active: false },
  ]);

  function handleOnFilterChange(selected) {
    setFilteredOptions((prev) =>
      prev.map((prevOption) => ({
        ...prevOption,
        active: prevOption.title === selected.title,
      }))
    );
  }
if (loading) {
  return <div className="text-center mt-10">Loading dashboard...</div>;
}

  return (
    <div className="max-w-screen-xl flex flex-col justify-center items-center gap-10">
      {/* Top right section (filter section )*/}
      <div className="flex w-full justify-between items-center mb-4">
        <div></div>
        <CustomFilter
          options={filterOptions}
          handleClick={handleOnFilterChange}
        />
      </div>

      {/* the first section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            imgSrc={stat.imgSrc}
          />
        ))}
      </div>

      {/* the second charts section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {chartsData.map((chartItem, index) => (
          <ChartsCard
            key={index}
            title={chartItem.title}
            imgSrc={chartItem.imgSrc}
          >
            {chartItem.chart}
          </ChartsCard>
        ))}

      </div>

      {/* the third section */}
      <CommonDiagnoses  data={commonDiagnoses}/>
    </div>
  );
}

export default Dashboard;
