import React from 'react'
import Card from '@/components/Common/Card';
import BarChar from '@/components/Doctor/Dashborad/BarChar';
import CustomFilter from '@/components/Doctor/Dashborad/CustomFilter';
import { useState } from 'react';


function CommonDiagnoses({ data = [] }) {

  //  transform API data → chart format
  const chartData = data.map((item) => ({
    diagnose: item.name,
    patient: item.count,
  }));

      const [filterOptions, setFilteredOptions] = useState([
        { title: "All patients", active: true },
        { title: "This month", active: false },
      ]);
    
       function handleOnFilterChange(selected) {
    setFilteredOptions((prev) =>
      prev.map((option) => ({
        ...option,
        active: option.title === selected.title,
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

        {/* <div className="h-60 w-full">
            <BarChar show={false} data={chartData} dataKeyProp="diagnose"/>
        </div> */}
          <div className="h-60 w-full px-5 pb-5">
        {chartData.length > 0 ? (
          <BarChar
            show={false}
            data={chartData}
            dataKeyProp="diagnose"
          />
        ) : (
          <p className="text-center text-gray-400">
            No diagnoses data available
          </p>
        )}
      </div>
      </Card>
  )
}

export default CommonDiagnoses