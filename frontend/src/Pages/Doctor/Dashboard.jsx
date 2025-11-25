import React, { useState } from "react";
import Card from "../../components/Common/Card";
import EarningsChart from "../../components/Doctor/EarningsChart";
import BarChar from "../../components/Doctor/BarChar";
import Calendar from "../../components/Doctor/Calendar";
import RequestCard from "@/components/Doctor/RequestCard";
import CustomFilter from "@/components/Doctor/CustomFilter";
import Timeline from "@/components/Doctor/Timeline";
import StatsCard from "@/components/Doctor/StatsCard";
import ChartsCard from "@/components/Doctor/ChartsCard";

const statsData = [
  { title: "Urgent patients", value: 2 },
  { title: "Patients", value: 12 },
  { title: "Lab Results", value: 7 },
];

const chartsData = [
  {
    title: "New vs Returning Patients",
    chart: <BarChar />,
  },
  {
    title: "Rating",
    chart: <EarningsChart type="natural" />,
  },
  {
    title: "Earnings",
    chart: <EarningsChart type="step" />,
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
    <div className="flex flex-col justify-center p-20 gap-10">
      {/* Top right section (filter section )*/}
      <div className="flex w-full justify-between items-center mb-4">
        <div></div>
        <CustomFilter
          options={filterOptions}
          handleClick={handleOnFilterChange}
        />
      </div>

      {/* the first section */}
      <div className="flex gap-4 justify-center items-center">
        {statsData.map((stat, index) => (
          <StatsCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>

      {/* the second charts section */}
      <div className="flex gap-4 justify-center items-center ">
        {chartsData.map((chartItem, index) => (
          <ChartsCard key={index} title={chartItem.title}>
            {chartItem.chart}
          </ChartsCard>
        ))}
      </div>

      {/* the third section Calendar */}
      <div className="flex justify-center gap-4 items-center ">
        <Card>
          <Calendar />
        </Card>

        <Card
          classname={`h-[414px] w-[510px] relative flex flex-col justify-start items-center gap-2 p-6 `}
        >
          <div className="absolute top-5 left-5">
            <Card classname="w-9 h-9 rounded-full "></Card>
          </div>
          <h1 className="font-semibold text-2xl mb-4">Requests</h1>
          <RequestCard />
          <RequestCard />
          <RequestCard />
          <RequestCard />
        </Card>
      </div>

      {/* fourth section */}
      <Timeline />
    </div>
  );
}

export default Dashboard;
