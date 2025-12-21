import React from 'react'

function ServicesSection() {
  return (
    <section className="px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
        <p className="text-gray-500 text-center mb-12">
        AI-powered healthcare services designed to support every step of your medical journey.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {title:"AI Diagnosis", desc:"Get fast, accurate health insights powered by advanced AI—simply upload your symptoms or medical files for instant analysis."},
            {title:"Book Appointments", desc:"Easily schedule appointments with trusted, verified doctors at the time that works best for you."},
            {title:"Consult Doctors", desc:"Send your diagnosis and medical files directly to qualified doctors for professional review and personalized guidance."},
            {title:"Treatment Plans", desc:"Receive medically reviewed treatment plans tailored to your condition, with built-in AI safety checks and drug conflict alerts."}
          ].map((service,i)=>(
            <div key={i} className="bg-gray-50 p-6 border border-blue-200 rounded ">
              <h3 className="font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
    </section>
  )
}

export default ServicesSection