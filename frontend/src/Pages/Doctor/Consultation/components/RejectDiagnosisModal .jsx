const RejectDiagnosisModal = ({ onClose }) => {
  return (
       <div className="fixed inset-1 bg-black/30 flex items-center justify-center z-50">
<div className="bg-white w-[620px] max-w-[90vw] shadow-2xl rounded-2xl p-8 space-y-4">
     <h3 className="font-bold mb-4 text-red-600">Reject Diagnosis</h3>


            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Reason</label>
            <input
              type="text"
              defaultValue="COVID-19"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none text-gray-600"
            />
          </div>
        

         <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Notes (optional)</label>
        <textarea
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none text-sm text-gray-600 leading-relaxed"
        />
        </div>


        <div className="flex justify-start gap-2 pt-2">
          <button className="px-5 py-1 text-sm bg-red-600 text-white rounded-lg">
            Reject
          </button>
          <button onClick={onClose} className="px-5 py-1 text-sm border rounded-lg">
            Cancel
          </button>
         
        </div>
      </div>
    </div>
  );
};
export default RejectDiagnosisModal;