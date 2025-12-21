import React from "react";

export default function ContactInfo() {
  const contactInfo = [
    {
      name: "Email",
      value: "support@healthcare.com",
      icon: "/email.png",
    },
    {
      name: "Phone",
      value: "+1 (555) 123-4567",
      icon: "/phone.png",
    },
    {
      name: "Address",
      value: "123 Medical Ave, Suite 100New York, NY 10001",
      icon: "/location.png",
    },
    {
      name: "Support Hours",
      value: "24/7 Customer SupportAvailable every day",
      icon: "/headPhone.png",
    },
  ];
  return (
    <div className="space-y-3">
      {/* contact information */}
      <div className="space-y-3">
        <div className="bg-gradient-to-b h-full  from-[#C6D8FD] to-[#207EFF] p-[1px] rounded-xl flex flex-col">
          <div className="p-3 rounded-xl bg-white space-y-4 w-full flex flex-col h-full">
            <h3 className=" text-xl text-[#252525DB]">Contact Information</h3>
            {contactInfo.map((item, index) => (
            <div
              className="flex  items-start gap-1 "
              key={index}
            >
              <div className="bg-[#C6D8FDA1] py-1 px-2 rounded ">
                <img
                  src={item.icon}
                  alt=""
                  className="w-5 h-5 object-contain"
                />
              </div>
              <div>
                {" "}
                <h4 className="text-[#25252596] font-semibold">{item.name}</h4>
                <a href="mailto:support@healthcare.com" className="">
                  {item.value}
                </a>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>


      {/* location */}
      <div className="bg-gradient-to-b h-full  from-[#C6D8FD] to-[#207EFF] p-[1px] rounded-xl flex flex-col">
        <div className="p-3 rounded-xl bg-white  w-full flex flex-col ">
            <h3 className=" text-xl text-[#252525DB]">Our Location</h3>
            <div className="p-2">
                <img src="/e1a00a3730bd2febf5c072502deaac6baabf816e.png" alt="" className="w-full h-full object-contain" />
            </div>

        </div>
      </div>
    </div>
  );
}
