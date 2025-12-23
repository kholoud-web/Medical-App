import InquiryForm from "./InquiryForm";
import InquiryCard from "./InquiryCard";
import InquiryHeader from "./InquiryHeader";

export default function Inquiries() {
  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-7xl mx-auto">

        <InquiryHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2  bg-gray-50 rounded-xl border  p-6">
            <InquiryForm />
          </div>

          <div className="space-y-4">
            <InquiryCard
              title="Knee pain after running"
              code="TKT-2024-1156"
              date="Nov 23, 2025"
              status="In progress"
            />
            <InquiryCard
              title="Persistent wrist pain"
              code="TKT-2025-1032"
              date="Nov 30, 2025"
              status="Replied"
            />
            <InquiryCard
              title="Lower back stiffness"
              code="TKT-2025-1033"
              date="Dec 2, 2025"
              status="In progress"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
