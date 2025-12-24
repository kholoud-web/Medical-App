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
              <div className="flex max-[370px]:flex-col   items-start gap-1 " key={index}>
                <div className="bg-[#C6D8FDA1] py-1 px-2 rounded ">
                  <img
                    src={item.icon}
                    alt=""
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <div>
                  {" "}
                  <h4 className="text-[#25252596] font-semibold">
                    {item.name}
                  </h4>
                  <a
                    href={
                      item.name === "Email"
                        ? `mailto:${item.value}`
                        : item.name === "Phone"
                        ? `tel:${item.value}`
                        : "#"
                    }
                  >
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d439792.95214408194!2d31.66063188566025!3d30.552625373522083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scity%20stars!5e0!3m2!1sen!2seg!4v1766346077213!5m2!1sen!2seg"
              loading="lazy"
              className="w-full min-h-[250px]"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
