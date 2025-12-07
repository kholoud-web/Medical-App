import React from "react";
import Card from "@/components/Common/Card";


function ChartsCard({ children , title}) {
  return (
    <Card
      classname={`h-64 flex flex-col justify-start items-center gap-4 p-6 w-80 relative`}
    >
      <div className="absolute top-5 left-5">
        <Card classname="w-9 h-9 rounded-full "></Card>
      </div>
      <h1 className="font-semibold text-2xl text-center ml-5 mt-[-2px] ">
        {title}
      </h1>

      <div className="absolute bottom-1 left-0 w-72 h-44">
        {children}
      </div>
    </Card>
  );
}

export default ChartsCard;
