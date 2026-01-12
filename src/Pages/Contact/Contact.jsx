import React from "react";
import ContactForm from "./Component/ContactForm";
import ContactInfo from "./Component/ContactInfo";

export default function Contact() {
  return (
    <div className="px-8 py-16 space-y-3">
      <div className="space-y-1 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Get in Touch</h2>
        <p className="text-[#252525C2] text-center">
          We're always here to support you. Reach out with any questions or
          concerns.
        </p>
      </div>

      <div className="grid grid-cols-12  gap-4">
       <div className="col-span-12 md:col-span-6 xl:col-span-8"><ContactForm/></div>
       <div className="col-span-12 md:col-span-6 xl:col-span-4"> <ContactInfo/></div>
       
      </div>
    </div>
  );
}
