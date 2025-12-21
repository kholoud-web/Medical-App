import React from 'react'
import Card from '@/components/Common/Card';
import BarChar from '@/components/Doctor/Dashborad/BarChar';
import CustomFilter from '@/components/Doctor/Dashborad/CustomFilter';
import { useState } from 'react';

export const chartData = [
  { diagnose: "Osteoarthritis", patient: 180, new: 120 },
  { diagnose: "Fracture", patient: 210, new: 160 },
  { diagnose: "Osteoporosis", patient: 90, new: 70 },
  { diagnose: "Frozen Shoulder", patient: 160, new: 110 },
  { diagnose: "Tendonitis", patient: 130, new: 100 },
  { diagnose: "Meniscus Tear", patient: 130, new: 100 },
  { diagnose: "Bursitis", patient: 130, new: 100 },
]

function CommonDiagnoses() {
      const [filterOptions, setFilteredOptions] = useState([
        { title: "All patients", active: true },
        { title: "This month", active: false },
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
      <Card classname='w-[1000px] flex flex-col justify-start items-center gap-4 p-0 '>
        <div className="w-full flex justify-between items-center mb-4 p-5 ">
          <div>
            <h2 className="font-semibold text-lg">Common Diagnoses</h2>
            <p className="text-sm text-gray-400">
              Most frequent diagnoses
            </p>
          </div>

            <CustomFilter options={filterOptions} handleClick={handleOnFilterChange} />
        </div>

        <div className="h-60 w-full">
            <BarChar show={false} data={chartData} dataKeyProp="diagnose"/>
        </div>
      </Card>
  )
}

export default CommonDiagnoses