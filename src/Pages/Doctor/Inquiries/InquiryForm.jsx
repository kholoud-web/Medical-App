import IconDownload from "./Icons/download.svg";
import { setSymptoms,  setDescription,
  addFile, resetInquiry,submitInquiry,fetchInquiryById,} from "../../../RiduxToolkit/Slices/InquirySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";



export default function InquiryForm({inquiryId}) {
  const dispatch = useDispatch();
  const {symptoms,description,files,loading,fetchingInquiry,}= useSelector((state) => state.inquiry);
 
  
useEffect(() => {
    if (inquiryId) {
      dispatch(fetchInquiryById(inquiryId));
    } else {
      dispatch(resetInquiry()); 
    }
  }, [inquiryId, dispatch]);


 const handleFileChange= (e)=>{
  const selectedFiles = Array.from(e.target.files);
    selectedFiles.forEach((file) => dispatch(addFile(file)));
    e.target.value = "";
 }



   const handleSubmit = async () => {
 if (!symptoms || !description) {
      alert("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("symptoms", symptoms);
    formData.append("description", description);

    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
     if (inquiryId) {
      formData.append("inquiryId", inquiryId);
    }


    try {
      await dispatch(submitInquiry(formData)).unwrap();
      dispatch(resetInquiry());
      alert("Inquiry submitted successfully");
    } catch (error) {
      alert("Failed to submit inquiry: " + error);
    }
  };

  if (fetchingInquiry) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500 text-sm">Loading inquiry data...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-5">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Symptom <span className="text-red-600">*</span>
        </label>
        <input
         value={symptoms}
         onChange={(e)=>dispatch(setSymptoms(e.target.value))}
          type="text"
          placeholder="e.g pain, swelling, stiffness"
          className="w-full rounded-lg border px-4 py-2 text-sm
          focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-600">*</span>
        </label>
        <textarea
        value={description}
        onChange={(e)=>dispatch(setDescription(e.target.value))}
          rows="4"
          placeholder="Describe when it started, how severe it is, and what makes it better or worse"
          className="w-full rounded-lg border px-4 py-2 text-sm
          focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        />
      </div>

    
      <div>
        <label className="flex items-center gap-3 text-sm font-medium mb-2">
          Attachments <span className="text-red-600">*</span>
        </label>

        <div
          className="border-2 bg-white border-dashed rounded-lg p-8
          flex items-center gap-2
          text-sm text-gray-500
          hover:border-blue-400 transition cursor-pointer"
        >
          <span className="flex items-center justify-center w-12 h-12 rounded-md">
            <img src={IconDownload} alt="download" className="w-4 h-4" />
          </span>
          
          
           <input
           className="flex items-center justify-center"
          id="fileUpload"
          placeholder=" Upload medical files (lab results, reports, images)"
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
        />

        {/* File list */}
        {files.length > 0 && (
          <ul className="mt-2 text-sm text-gray-600">
            {files.map((file, index) => (
              <li key={index}>• {file.name}</li>
            ))}
          </ul>
        )}
       
        </div>
      </div>

      <button onClick={handleSubmit}
        className="w-[452px] mx-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700
        text-white font-medium py-2 rounded-lg transition"
      >

        {loading ? "Submitting..." : "Select doctor"}
      </button>
    </div>
  );

}