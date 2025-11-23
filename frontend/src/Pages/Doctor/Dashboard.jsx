import React from "react";
import Card from "../../components/Common/Card";
import PrimButton from "../../components/Common/PrimButton";

function Dashborad() {
  const cardStyles =
    "flex flex-col justify-center items-center gap-4 p-7 w-80 h-48 relative";

  return (
    <>
      <div className="flex gap-10 justify-center items-center mt-20 p-10 rounded-2xl">
        {/* <Card classname={cardStyles}>
          <div className="flex  items-center w-full">
            <div className="pr-6">
              <Card classname="w-9 h-9 rounded-full "></Card>
            </div>
            <h1 className=" font-semibold text-2xl ">Urgent patients</h1>
          </div>
          <h2 className="font-bold text-5xl">2</h2>
          <PrimButton className="w-[214px] h-9">View</PrimButton>
        </Card>

        <Card classname="flex w-80 h-48 ">
          <div className="flex flex-col pl-3 pt-4">
          <Card classname="w-9 h-9 rounded-full "></Card>
          </div>
          
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="font-semibold text-2xl ">Patients</h1>
            <h2 className="font-bold text-5xl">12</h2>
            <PrimButton className="w-[214px] h-9">View</PrimButton>
          </div>
        </Card> */}
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
      <div className="flex gap-10 justify-center items-center ">
        <Card classname={`h-64 ${cardStyles} `} >
          <div className="absolute top-5 left-5">
            <Card classname="w-9 h-9 rounded-full "></Card>
          </div>
           <h1 className="font-semibold text-2xl ">Urgent patients</h1>

        </Card>
      </div>
    </>
  );
}

export default Dashborad;
