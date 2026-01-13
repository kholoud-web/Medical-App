import axios from "axios";
import React, { useState, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function VideoUploadOverlay({ onClose }) {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const navigate = useNavigate();


  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.includes("video")) return alert("Please upload a video file");
    if (file.size > 10 * 1024 * 1024) return alert("Max size is 10MB");
    setVideo(file);
  };

  const handleSend = async () => {
  if (!video) return;

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("video", video);

    const res = await axios.post(
      "https://medicalbotdt-production-b268.up.railway.app/PhysiotherapyExercise/submit-video",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    navigate("/ai-results", { state: res.data });
  } catch (err) {
    alert("Error while analyzing video");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    
   <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">


      <div className="bg-white w-[90%] sm:w-[420px] md:w-[480px] rounded-2xl shadow-2xl p-6 space-y-6 animate-scaleIn relative">

<div className="flex justify-end">
  <button
    onClick={onClose}
    className="text-black-400 hover:text-red-500 text-xl font-bold"
  >
    ×
  </button>
</div>
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <FiUploadCloud className="text-primary-blue text-2xl" />
          </div>
          <h2 className="text-xl font-semibold">Upload your Video here</h2>
          <p className="text-sm text-gray-500">
            Drag and drop your Video here, or click to browse <br />
            Supported formats: mp4 , Maximum size : 10 MB
          </p>
        </div>

        {/* Upload Area */}
        <div
          onClick={() => fileRef.current.click()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3 h-[170px] overflow-hidden"
        >
          <MdOutlineVideoLibrary className="text-3xl text-gray-400" />
          <p className="text-sm text-gray-600">
            {video ? video.name : "Select Video"}
          </p>

          <input
            ref={fileRef}
            type="file"
            hidden
            accept="video/mp4"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        {/* Button */}
        <button
  disabled={!video || loading}
  onClick={handleSend}
  className="w-full bg-primary-blue text-white py-2 rounded-lg font-medium disabled:opacity-40"
>
  {loading ? "Analyzing..." : "Send"}
</button>


      </div>
    </div>
  );
}
