import IconHealth from './Icons/healthicons.svg'
import IconQus from './Icons/qus.svg'

export default function InquiryHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
  
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Inquiries</h2>
        <p className="text-sm text-gray-500">
          Share your symptoms for doctor review.
        </p>
      </div>

   
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-2 px-6 py-3 text-xs border border-blue-300 text-blue-500 rounded-xl">
          <img src={IconHealth} alt="health" className="w-5 h-5" />
          24/7 Medical-oriented
        </span>

        <span className="flex items-center gap-2 px-6 py-3 text-xs border border-blue-300 text-blue-500 rounded-xl">
          <img src={IconQus} alt="progress" className="w-5 h-5 " />
          Average Response: 24–48 hours
        </span>
      </div>
    </div>
  );
}
