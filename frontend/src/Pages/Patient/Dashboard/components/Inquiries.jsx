function InquiriesTable({ items = [], loading = false, error = "" }) {
  const safeItems = Array.isArray(items) ? items : [];
  const helperText = error
    ? "Failed to load inquiries."
    : loading
      ? "Loading..."
      : "Your scheduled inquiries";

  return (
    <div className="bg-treat-bg-Gray p-4 rounded-xl border border-primary-blue/50">
      <h3 className="font-semibold mb-1">Inquiries Overview</h3>
      <p className="text-sm text-gray-500 mb-4">{helperText}</p>

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
          {loading ? (
            <tr className="border-t text-center">
              <td colSpan="6" className="py-6 text-gray-400">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr className="border-t text-center">
              <td colSpan="6" className="py-6 text-red-500">
                Failed to load inquiries.
              </td>
            </tr>
          ) : safeItems.length === 0 ? (
            <tr className="border-t text-center">
              <td colSpan="6" className="py-6 text-gray-400">
                No inquiries yet.
              </td>
            </tr>
          ) : (
            safeItems.map((item, i) => {
              const statusText = item?.status ? String(item.status) : "pending";
              const statusKey = statusText.toLowerCase();
              const isConfirmed = ["confirmed", "approved", "completed"].includes(
                statusKey
              );
              const isPending = ["pending", "waiting", "in-progress"].includes(
                statusKey
              );
              const statusClass = isConfirmed
                ? "bg-green-100 text-green-600"
                : isPending
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-gray-100 text-gray-600";

              return (
                <tr key={i} className="border-t text-center">
                  <td className="py-3 text-left">{item?.doctor || "-"}</td>
                  <td>{item?.subject || "-"}</td>
                  <td>{item?.date || "-"}</td>
                  <td>{item?.time || "-"}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${statusClass}`}
                    >
                      {statusText}
                    </span>
                  </td>
                  <td className="space-x-2">
                    <button className="px-2 py-1 border rounded hover:bg-primary-blue hover:text-white transition-all duration-200">
                      Details
                    </button>
                    <button className="px-2 py-1 text-red-500 hover:drop-shadow-lg">
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
export default InquiriesTable;
