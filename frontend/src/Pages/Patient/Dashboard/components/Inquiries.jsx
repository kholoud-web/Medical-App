const inquiries = [
  {
    doctor: "Dr. Ali Sameh",
    subject: "Headache and Dizziness",
    date: "2025/11/20",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    doctor: "Dr. Sarah Ahmed",
    subject: "Prescription Renewal",
    date: "2025/12/2",
    time: "11:15 AM",
    status: "confirmed",
  },
  {
    doctor: "Dr. Karam Adel",
    subject: "Medication Side Effects",
    date: "2025/11/25",
    time: "2:30 PM",
    status: "pending",
  },
];

function InquiriesTable() {
  return (
    <div className="bg-treat-bg-Gray p-4 rounded-xl border border-primary-blue/50">
      <h3 className="font-semibold mb-1">Inquiries Overview</h3>
      <p className="text-sm text-gray-500 mb-4">
        Your scheduled inquiries
      </p>

      <table className="w-full text-sm">
        <thead className="text-gray-500 ">
          <tr>
            <th className="text-left py-2">Doctor Name</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((item, i) => (
            <tr key={i} className="border-t text-center">
              <td className="py-3 text-left">{item.doctor}</td>
              <td>{item.subject}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.status === "confirmed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="space-x-2">
                <button className="px-2 py-1 border rounded hover:bg-primary-blue hover:text-white  transition-all duration-200">
                  Details
                </button>
                <button className="px-2 py-1 text-red-500 hover:drop-shadow-lg">
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default InquiriesTable;