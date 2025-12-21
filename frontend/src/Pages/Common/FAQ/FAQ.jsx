import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment by selecting a doctor, choosing an available time slot, and confirming your booking through the platform.",
  },
  {
    question: "Can I cancel or reschedule my appointment?",
    answer:
      "Yes, appointments can be canceled or rescheduled from your dashboard before the scheduled time.",
  },
  {
    question: "Are the doctors verified?",
    answer:
      "All doctors on our platform are verified and licensed healthcare professionals.",
  },
  {
    question: "Is my medical data secure?",
    answer:
      "Yes, we use industry-standard security practices to protect your medical data.",
  },
  {
    question: "Do you offer online consultations?",
    answer:
      "Yes, many doctors offer online consultations via video calls.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact our support team using the button below or via email.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center mb-2">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Find quick answers to common questions about our services
      </p>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-blue-400 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left text-blue-600 font-medium"
            >
              {faq.question}
              <ChevronDown
                className={`transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Help Box */}
      <div className="mt-16 border border-blue-400 rounded-xl p-10 text-center bg-blue-50">
        <div className="flex justify-center mb-4">
            <img src="/faq.svg" alt="FAQ Help" className="h-16 w-16" />
        </div>

        <h3 className="font-semibold mb-2">Still Need Help?</h3>
        <p className="text-gray-600 mb-6">
          Can’t find the answer you’re looking for? Our support team is here to
          help you 24/7.
        </p>

        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition">
          Contact support
        </button>
      </div>
    </div>
  );
}
