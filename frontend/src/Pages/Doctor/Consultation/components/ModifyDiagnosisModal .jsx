import { useSelector, useDispatch } from "react-redux";
import { clearModifyData } from "../../../../RiduxToolkit/Slices/modifyConsultationSlice";

const ModifyDiagnosisModal = ({ onClose }) => {
  const { data, loading, error } = useSelector(
  (state) => state.modifyConsultation
);
{loading && <p>Loading...</p>}
{error && <p className="text-red-500">{error}</p>}

{data && (
  <>
    <input defaultValue={data.name} />
    <textarea defaultValue={data.notes} />
  </>
)}
const dispatch = useDispatch();

const handleClose = () => {
  dispatch(clearModifyData());
  onClose();
};

  return (
    <div className="fixed inset-1 bg-black/30 flex items-center justify-center z-50">
<div className="bg-white w-[620px] max-w-[90vw] shadow-2xl rounded-2xl p-8 space-y-4">
        <h3 className="font-bold mb-4">Modify Diagnosis</h3>
        
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              defaultValue="COVID-19"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none text-gray-600"
            />
          </div>
       <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
        <textarea
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none text-sm text-gray-600 leading-relaxed"
            defaultValue="A contagious respiratory illness caused by the SARS-CoV-2 virus. Symptoms include fever, cough, fatigue, and difficulty breathing. Preventive measures include vaccination, wearing masks, hand hygiene, and social distancing."
        />
        </div>

        <div className=" flex justify-start gap-2 pt-4">
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg">
            Save
          </button>
          <button onClick={handleClose} className="px-4 py-2 text-sm border rounded-lg">
            Cancel
          </button>
          
        </div>
      </div>
    </div>
  );
};
export default ModifyDiagnosisModal;
