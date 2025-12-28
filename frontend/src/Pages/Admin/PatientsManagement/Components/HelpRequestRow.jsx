const STATUS_STYLES = {
  NEW: "bg-blue-100 text-blue-600",
  REPLIED: "bg-green-100 text-green-600",
};

const HelpRequestRow = ({ request , onReply}) => {
  if (!request) return null; 

  const {
    avatar,
    name,
    age,
    gender,
    subject,
    status,
  } = request;

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="w-8 h-8 rounded-full"
        />
        <span>{name}</span>
      </td>

      <td className="px-6 py-4">{age} y</td>
      <td className="px-6 py-4">{gender}</td>
      <td className="px-6 py-4 text-sm">{subject}</td>

      <td className="px-6 py-4">
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            STATUS_STYLES[status] ?? "bg-gray-100 text-gray-500"
          }`}
        >
          {status}
        </span>
      </td>

      <td className="px-6 py-4">
        <button className="border px-3 py-1 rounded-md text-sm"
        onClick={() => onReply(request)}
        >
          <i className="fa-solid fa-reply"></i> Reply
        </button>
      </td>
    </tr>
  );
};

export default HelpRequestRow;
