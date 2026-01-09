import { FiFileText } from "react-icons/fi";
import { BiInjection } from "react-icons/bi";
import { FaPersonThroughWindow } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";

const cards = [
  {
    title: "Medical Files",
    value: "12 Files Uploaded",
    subtitle: "Last Update - Nov 20",
    icon: <FiFileText />,
  },
  {
    title: "Drug Checker",
    value: "0 Conflicts",
    subtitle: "All medications are safe",
    icon: <BiInjection />,
  },
  {
    title: "Physiotherapy",
    value: "3 New AI Sessions",
    subtitle: "Scheduled this week",
    icon: <FaPersonThroughWindow />,
  },
  {
    title: "Inquiries",
    value: "2 Pending",
    subtitle: "Awaiting doctor response",
    icon: <TiMessages />,
  },
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="p-4 rounded-xl border bg-treat-bg-Gray hover:bg-primary-blue hover:text-white hover:shadow-md duration-300 transition-colors cursor border-primary-blue/50"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{card.title}</h3>
            <span className="text-xl">{card.icon}</span>
          </div>
          <p className="mt-2 font-bold">{card.value}</p>
          <p className="text-sm opacity-80">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
