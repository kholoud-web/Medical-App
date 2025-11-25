import React from "react";
import Card from "@/components/Common/Card";
import PrimButton from "@/components/Common/PrimButton";

function StatsCard({value , title}) {
  return (
    <Card classname='flex flex-col justify-start items-center gap-4 p-6 w-80 h-48 relative'>
      <div className="absolute top-5 left-5">
        <Card classname="w-9 h-9 rounded-full "></Card>
      </div>
      <h1 className="font-semibold text-2xl ">{title}</h1>
      <h2 className="font-bold text-5xl">{value}</h2>
      <PrimButton className="w-[214px] h-9">View</PrimButton>
    </Card>
  );
}

export default StatsCard;
