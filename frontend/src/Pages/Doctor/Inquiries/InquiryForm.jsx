import IconDownload from "./Icons/download.svg";

export default function InquiryForm() {
  return (
    <div className="space-y-5">

    
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Symptom <span className="text-red-600">*</span>
        </label>
        <input
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

          <span>
            Upload medical files (lab results, reports, images)
          </span>
        </div>
      </div>

      <button
        className="w-[452px] mx-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700
        text-white font-medium py-2 rounded-lg transition"
      >
        Select doctor
      </button>
    </div>
  );
}
