import React from "react";
import Card from "../../components/Common/Card";
import PrimButton from "../../components/Common/PrimButton";
import EarningsChart from "../../components/Doctor/EarningsChart";
import { Bar } from "recharts";
import BarChar from "../../components/Doctor/BarChar";

function Dashborad() {
  const cardStyles =
    "flex flex-col justify-start items-center gap-4 p-6 w-80 h-48 relative";

  return (
    <>

    {/* the first section */}
      <div className="flex gap-10 justify-center items-center mt-20 p-10 rounded-2xl">
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


    {/* the charts section */}
      <div className="flex gap-10 justify-center items-center ">
        <Card
          classname={`h-64 flex flex-col justify-start items-center gap-4 p-6 w-80 relative`}
        >
          <div className="absolute top-5 left-5">
            <Card classname="w-9 h-9 rounded-full "></Card>
          </div>
          <h1 className="font-semibold text-2xl text-center ml-5 mt-[-2px] ">New vs Returning Patients</h1>

          <div className="absolute bottom-1 left-0 w-72 h-44">
            <BarChar />
          </div>
        </Card>
        <Card
          classname={`h-64 ${cardStyles}`}
        >
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
    </>
  );
}

export default Dashborad;
