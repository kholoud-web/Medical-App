import React, { useState } from "react";
import EarningsChart from "../../components/Doctor/Dashborad/EarningsChart";
import BarChar from "../../components/Doctor/Dashborad/BarChar";
import CustomFilter from "@/components/Doctor/Dashborad/CustomFilter";
import StatsCard from "@/components/Doctor/Dashborad/StatsCard";
import ChartsCard from "@/components/Doctor/Dashborad/ChartsCard";
import CommonDiagnoses from "@/components/Doctor/Dashborad/CommonDiagnoses";

const statsData = [
  { title: "Consultations", value: 12 , imgSrc:"/consultaions.svg"},
  { title: "Treatment plans", value: 8 , imgSrc:"/TreatmentPlans.svg"},
];

const chartsData = [
  {
    title: "New vs Returning Patients",
    chart: <BarChar />,
    imgSrc:"/people.svg"
    },
  {
    title: "Rating",
    chart: <EarningsChart type="natural" />,
    imgSrc:"/star.svg"
  },
  {
    title: "Earnings",
    chart: <EarningsChart type="step" />,
    imgSrc:"/money.svg"
  },
];

function Dashboard() {
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
          <div key={index}>
          <StatsCard title={stat.title} value={stat.value} imgSrc={stat.imgSrc}  />
          </div>
        ))}
      </div>

      {/* the second charts section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {chartsData.map((chartItem, index) => (
          <div key={index}>
          <ChartsCard title={chartItem.title} imgSrc={chartItem.imgSrc} >
            {chartItem.chart}
          </ChartsCard>
          </div>
        ))}
      </div>

      {/* the third section */}
      <CommonDiagnoses />
    </div>
  );
}

export default Dashboard;
