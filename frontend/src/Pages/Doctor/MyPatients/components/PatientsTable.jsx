export default function PatientsTable({ patients }) {
  return (
    <div className="rounded-xl overflow-hidden bg-white">
      <table className="table-auto w-full text-left">
        <thead className="text-blue-500 text-sm border-b font-medium">
          <tr>
            <th className="px-6 py-4 font-medium">Patient Name</th>
            <th className="px-6 py-4 font-medium">ID</th>
            <th className="px-6 py-4 font-medium">Last Visit</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Contact</th>
            <th className="px-6 py-4 font-medium">Info</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="border-b hover:bg-gray-50 transition">
              <td className="px-6 py-4 flex items-center gap-3">
                <img
                  src={patients[0].img}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium text-gray-700">
                  {patients[0].name}
                </span>
              </td>

              <td className="px-6 py-4 text-gray-600">{patients[0].id}</td>
              <td className="px-6 py-4 text-gray-600">
                {patients[0].lastVisit}
              </td>

              <td className="px-6 py-4">
                <span className="text-green-600 font-medium">
                  {patients[0].status}
                </span>
              </td>

              <td className="px-6 py-4 text-gray-600">{patients[0].contact}</td>

              <td className="px-6 py-4">
                <button className="text-blue-600 hover:underline font-medium text-sm">
                  View Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
