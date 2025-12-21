import React from "react";
import { CiSearch } from "react-icons/ci";

export default function DrugChecker() {
  const dragDetailds = [
    {
      icon: "/f21303d4f02b5b6d8c6b060c493015301f0cb558.png",
      title: "Dosage",
      details:
        "0.25 to 0.5 mg, 3 times daily for anxiety; 0.5 to 1 mg, once daily for panic disorder.",
    },
    {
      icon: "/Old Age Home.png",
      title: "Age",
      details:
        "Primarily for adults. Safety and effectiveness inindividuals under 18 have not been established.",
    },
    {
      icon: "/eae6aa659f4cedffa0b3836059b2198bdad45196.png",
      title: "Interactions",
      details:
        "Interacts with opioids, sedatives,and alcohol. Can cause severe sedation.",
    },
  ];

 
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h2 className="text-3xl font-bold">Drug Checker</h2>
        <p className="text-xl text-center">Detailed information for Xanax</p>
      </div>

      {/* inpute */}
       <div className="relative mt-4">
              <input
                type="text"
                id="search"
                className="px-2 py-3 w-full border border-primary-blue rounded outline-none
                           peer text-black placeholder:text-transparent"
                placeholder="Search Drug"
              />
      
              <label
                htmlFor="search"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                           text-primary-blue text-lg pointer-events-none transition-all
                           flex items-center gap-1
                           peer-focus:opacity-0 peer-focus:invisible
                           peer-[&:not(:placeholder-shown)]:opacity-0">
                <CiSearch className="text-2xl" /> Search Drug
              </label>
            </div>

             <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 max-[570px]:grid-cols-1 xl:grid-cols-3 gap-3">
            {dragDetailds.map((item, index) => (
             <div className='space-y-2 bg-gradient-to-t h-full from-[#C6D8FD] to-[#207EFF] p-[2px] rounded-xl flex'>
                 <div key={index} className="bg-white rounded-xl py-10 px-4 space-y-2 flex flex-col justify-center items-center">
                
                  <h2 className="font-bold text-xl">{item.title}</h2>
                  <p>{item.details}</p>
                  <img src={item.icon} alt="icon" className="w-10 h-10" />
                
              </div>
             </div>
            ))}
        </div>


        {/* two div */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
         
            {/*  */}
           <div className="space-y-2 bg-gradient-to-t h-full from-[#C6D8FD] to-[#207EFF] p-[2px] rounded-xl flex">
             <div  className="bg-white rounded-xl w-full py-10 px-4 space-y-2 flex flex-col justify-center items-center">
               <h2 className="font-bold text-xl">Contraindications</h2>
               <ul>
                <li className="relative"><span className="w-1 h-1 absolute top-1/2 -left-2   rounded-full bg-primary-blue"></span>Known hypersensitivity to benzodiazepines.</li>
                <li className="relative"><span className="w-1 h-1 absolute top-1/2 -left-2   rounded-full bg-primary-blue"></span>Acute narrow-angle glaucoma.</li>
                <li className="relative"><span className="w-1 h-1 absolute top-1/2 -left-2   rounded-full bg-primary-blue"></span>Concomitant use with potent CYP3A inhibitors <br/>(e.g., ketoconazole)..</li>
               </ul>
               <img src="public/ae364bdc197008a1d74cb60999984c8a23179d99.png" alt="" className="w-10 h-10"/>
            </div>
           </div>
     {/*  */}
           <div className="space-y-2 bg-gradient-to-t h-full from-[#C6D8FD] to-[#207EFF] p-[2px] rounded-xl flex">
             <div  className="bg-white rounded-xl py-10 px-4 space-y-2 flex flex-col justify-center items-center">
           <h2 className="font-bold text-xl">Side Effects</h2>
           <ul>
            <li><span className="text-primary-blue">Common</span>: Drowsiness, dizziness, fatigue. Serious: Slurred speech, memory problems, thoughts of suicide.</li>
            <li><span className="text-primary-blue">Serious</span>: Slurred speech, memory problems, thoughts of suicide.</li>
           </ul>
           <img src="/9b563695ad7696437890584d7cbd2302c3069e63.png" alt="" className="w-10 h-10"/>
            </div>
           </div>
    

        </div>
    </div>
  );
}