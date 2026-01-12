import React, { useState } from "react";
import Card from "@/components/Common/Card";
import CustomFilter from "@/components/Doctor/Dashborad/CustomFilter";
import MedicalRow from "@/components/Doctor/Dashborad/MedicalRow";

function Timeline() {
  const [filterOptions, setFilteredOptions] = useState([
    { title: "Completed", active: true },
    { title: "Pending", active: false },
    { title: "Cancelled", active: false },
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
    <div className="hidden xl:flex justify-center">
      <Card
        classname={`h-[355px] w-[1000px] relative flex flex-col justify-start items-center gap-2 p-6 `}
      >
        <div className="flex w-full justify-end gap-4 items-center mb-4">
          <div className="absolute top-5 left-5">
            <Card classname="w-9 h-9 rounded-full "></Card>
          </div>
          <h1 className="font-semibold text-2xl mr-3">
            Patients Medical Timeline Today
          </h1>
          <CustomFilter
            options={filterOptions}
            handleClick={handleOnFilterChange}
          />
          <button className="font-semibold w-28 text-center text-[#207EFF]">
            View More
          </button>
        </div>

        <div className="flex flex-col p-4 items-center justify-center w-full gap-2">
          <MedicalRow />
          <div className="w-full bg-dashboard-border h-[2px]"></div>
          <MedicalRow />
          <div className="w-full bg-dashboard-border h-[2px]"></div>
          <MedicalRow />
          <div className="w-full bg-dashboard-border h-[2px]"></div>
          <MedicalRow />
        </div>
      </Card>
    </div>
  );
}

export default Timeline;
