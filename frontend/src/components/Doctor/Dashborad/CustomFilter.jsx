import React from "react";
import Card from "@/components/Common/Card";

function CustomFilter({ options = []  , handleClick}) {
  return (
    <Card classname="flex gap-2 ">
      {options.map((option, index) =>
        option.active ? (
          <Card key={index} onClick={()=>handleClick(option)} classname="!bg-[#C6D8FD] text-[#3562BC] font-semibold w-28 text-center border-collapse">
            <button>
                {option.title}
            </button>
          </Card>
        ) : (
          <button key={index} onClick={()=>handleClick(option)} className="font-semibold w-28 text-center text-[#8F8F8F]">
            {option.title}
          </button>
        )
      )}
    </Card>
  );
}

export default CustomFilter;
