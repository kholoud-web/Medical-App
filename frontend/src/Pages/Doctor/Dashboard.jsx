import React from "react";
import Card from "../../components/Common/Card";
import PrimButton from "../../components/Common/PrimButton";
import EarningsChart from "../../components/Doctor/EarningsChart";
import { Bar } from "recharts";
import BarChar from "../../components/Doctor/BarChar";
import Calendar from "../../components/Doctor/Calendar";
import RequestCard from "@/components/Doctor/RequestCard";
import MedicalRow from "@/components/Doctor/MedicalRow";
// import avatar from '../../assests/avatar.svg'

function Dashborad() {
  const cardStyles =
    "flex flex-col justify-start items-center gap-4 p-6 w-80 h-48 relative";

  return (
    <div className="flex flex-col justify-center p-20 gap-10">

      {/* the first section */}
      <div className="flex gap-4 justify-center items-center">
        <Card classname={cardStyles}>
          <div className="absolute top-5 left-5">
            <Card classname="w-9 h-9 rounded-full "></Card>
          </div>
          <h1 className="font-semibold text-2xl ">Urgent patients</h1>
          <h2 className="font-bold text-5xl">2</h2>
          <PrimButton className="w-[214px] h-9">View</PrimButton>
        </Card>
        <Card classname={cardStyles}>
          <div className="absolute top-5 left-5">
            <Card classname="w-9 h-9 rounded-full "></Card>
          </div>
          <h1 className="font-semibold text-2xl ">Patients</h1>
          <h2 className="font-bold text-5xl">12</h2>
          <PrimButton className="w-[214px] h-9">View</PrimButton>
        </Card>
        <Card classname={cardStyles}>
          <div className="absolute top-5 left-5">
            <Card classname="w-9 h-9 rounded-full "></Card>
          </div>
          <h1 className="font-semibold text-2xl ">Lab Results</h1>
          <h2 className="font-bold text-5xl">7</h2>
          <PrimButton className="w-[214px] h-9">View</PrimButton>
        </Card>
      </div>

      {/* the second charts section */}
      <div className="flex gap-4 justify-center items-center ">
        <Card
          classname={`h-64 flex flex-col justify-start items-center gap-4 p-6 w-80 relative`}
        >
          <div className="absolute top-5 left-5">
            <Card classname="w-9 h-9 rounded-full "></Card>
          </div>
          <h1 className="font-semibold text-2xl text-center ml-5 mt-[-2px] ">
            New vs Returning Patients
          </h1>

          <div className="absolute bottom-1 left-0 w-72 h-44">
            <BarChar />
          </div>
        </Card>
        <Card classname={`h-64 ${cardStyles}`}>
          <div className="absolute top-5 left-5">
            <Card classname="w-9 h-9 rounded-full "></Card>
          </div>
          <h1 className="font-semibold text-2xl ">Rating</h1>

          <div className="absolute bottom-1 left-0 w-72 h-44">
            <EarningsChart type={"natural"} />
          </div>
        </Card>
        <Card
          classname={`h-64 flex flex-col justify-start items-center gap-4 p-6 w-80 relative`}
        >
          <div className="absolute top-5 left-5">
            <Card classname="w-9 h-9 rounded-full "></Card>
          </div>
          <h1 className="font-semibold text-2xl ">Earnings</h1>

          <div className="absolute bottom-1 left-0 w-72 h-44">
            <EarningsChart type="step" />
          </div>
        </Card>
      </div>

      {/* the third section Calendar */}
      <div className="flex justify-center gap-4 items-center ">
        <Card>
          <Calendar />
        </Card>

        <Card classname={`h-[414px] w-[510px] relative flex flex-col justify-start items-center gap-2 p-6 `}>
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
        <div className="flex justify-center">
          <Card classname={`h-[355px] w-[1000px] relative flex flex-col justify-start items-center gap-2 p-6 `}>
          <div className="flex w-full justify-end gap-4 items-center mb-4">

          
          <div className="absolute top-5 left-5">
            <Card classname="w-9 h-9 rounded-full "></Card>
          </div>
          <h1 className="font-semibold text-2xl mr-8">Patients Medical Timeline Today</h1>
          <Card classname="flex gap-2 ">
            <Card classname="bg-[#C6D8FD] text-[#3562BC] font-semibold w-28 text-center border-collapse">Completed</Card>
            <button className="font-semibold w-28 text-center text-[#8F8F8F]">
              Pending
            </button>
            <button className="font-semibold w-28 text-center text-[#8F8F8F]">
              Cancelled
            </button>
          </Card>
          <button className="font-semibold w-28 text-center text-[#207EFF]">View More</button>
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



    </div>
  );
}

export default Dashborad;
