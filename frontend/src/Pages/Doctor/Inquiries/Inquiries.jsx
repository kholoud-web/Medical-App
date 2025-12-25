import { useState } from "react";
import InquiryForm from "./InquiryForm";
import InquiryCard from "./InquiryCard";
import InquiryHeader from "./InquiryHeader";
import InquiryDetailsModal from "./InquiryDetailsModal";

export default function Inquiries() {
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const inquiries = [
    {
      title: "Knee pain after running",
      code: "TKT-2024-1156",
      date: "Nov 23, 2025",
      time: "Nov 23, 2025 at 2:30 PM",
      status: "In progress",
      description:
        "Pain after running\nI booked an appointment for tomorrow, but didn’t receive a confirmation message.",
      attachments: ["MRI_scan.pdf", "Blood_test.jpg"],
    },
    {
      title: "Persistent wrist pain",
      code: "TKT-2025-1032",
      date: "Nov 30, 2025",
      time: "Nov 30, 2025 at 1:10 PM",
      status: "Replied",
      description: "Wrist pain for more than a week.",
      attachments: ["Xray.jpg"],
    },
    {
      title: "Lower back stiffness",
      code: "TKT-2025-1033",
      date: "Dec 2, 2025",
      time: "Dec 2, 2025 at 3:45 PM",
      status: "In progress",
      description: "Lower back stiffness every morning.",
      attachments: ["CT_scan.pdf"],
    },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">

        <InquiryHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-50 rounded-xl border p-6">
            <InquiryForm />
          </div>

          <div className="space-y-4">
            {inquiries.map((item, index) => (
              <InquiryCard
                key={index}
                inquiry={item}
                onOpen={setSelectedInquiry}
              />
            ))}
          </div>
        </div>

        <InquiryDetailsModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
        />
      </div>
    </div>
  );
}
