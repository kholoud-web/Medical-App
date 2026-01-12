import React from "react";
import Card from "@/components/Common/Card";
import PrimButton from "@/components/Common/PrimButton";

function StatsCard({value , title , imgSrc}) {
  return (
    <Card classname='w-[486px] h-48 flex flex-col justify-start items-center gap-4 p-6 relative'>
      <div className="absolute top-5 left-5">
        <Card classname="w-10 h-10 rounded-full flex justify-center items-center bg-[#E6F0FF]">
          <img src={imgSrc} alt="stat-icon" />
        </Card>
      </div>
      <h1 className="font-semibold text-2xl ">{title}</h1>
      <h2 className="font-bold text-5xl">{value}</h2>
      <PrimButton className="w-[214px] h-9">View</PrimButton>
    </Card>
  );
}

export default StatsCard;
