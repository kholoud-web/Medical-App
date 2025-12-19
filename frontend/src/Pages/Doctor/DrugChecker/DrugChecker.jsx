import React from "react";
import { MdOutlinePregnantWoman, MdElderlyWoman } from "react-icons/md";
import { FaPersonBreastfeeding, FaChildren } from "react-icons/fa6";
import { RiHeartAdd2Fill } from "react-icons/ri";
import { ActionCard } from "../Treatment/treatment";
import AddConditionCard from "./components/AddConditionCard";
import WarningCard from "./components/WarningCard";

function DrugChecker() {
  return (
    <div className="p-6 space-y-8 max-w-screen-xl mx-auto">
      {/* title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold">Drug Conflict Check</h1>
        <p className="text-primary-black text-lg">
          Review potential drug interactions and compatibility issues below
        </p>
      </div>

      {/* first section */}
      <div className="border border-blue-300 rounded-2xl">
        <div className="bg-treat-bg-Gray rounded-2xl p-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-primary-black ">
              {" "}
              Compatibility / Conflict us :{" "}
            </h3>
          </div>
          <div className=" grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 max-[640px]:grid-cols-1">
            {/* Action card */}
            <ActionCard
              icon={<MdOutlinePregnantWoman size={20} />}
              title="Send Treatment Plan"
              btnText="Details"
            />
            <ActionCard
              icon={<FaPersonBreastfeeding size={20} />}
              title="Modify Prescription"
              btnText="Details"
            />
            <ActionCard
              icon={<FaChildren size={20} />}
              title="Refer For Physical Therapy"
              btnText="Details"
            />
            <ActionCard
              icon={<MdElderlyWoman size={20} />}
              title="Add Medical Instructions"
              btnText="Details"
            />
            <div className="grid col-span-2 max-[640px]:col-span-1">
              <ActionCard
                icon={<RiHeartAdd2Fill size={20} />}
                title="Add Medical Instructions"
                btnText="Details"
              />
            </div>
          </div>
        </div>
      </div>
      {/* second section */}
      <AddConditionCard />
      {/* third section */}
      <WarningCard description="Significant conflicts have been identified. It is strongly recommended to consult your healthcare provider before proceeding. Do not stop or change your medication without professional medical advice." />
    </div>
  );
}

export default DrugChecker;
