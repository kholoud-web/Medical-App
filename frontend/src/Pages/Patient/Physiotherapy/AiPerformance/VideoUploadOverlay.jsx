import { API } from "@/Api/Api";
import axios from "axios";
import React, { useState, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const exercises = [
  "Arm_Abduction",
  "Arm_VW",
  "Leg_Abduction",
  "Table_PushUps",
  "Leg_Lunge",
  "Squat",
];

export default function VideoUploadOverlay({ onClose }) {
  const [video, setVideo] = useState(null);
  const [exercise, setExercise] = useState("Arm_Abduction");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const navigate = useNavigate();

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.includes("video"))
      return alert("Please upload a video file");
    if (file.size > 10 * 1024 * 1024)
      return alert("Max size is 10MB");
    setVideo(file);
  };

  const handleSend = async () => {
  if (!video || !exercise) return;

  try {
    setLoading(true);

    const formData = new FormData();
formData.append("videoFile", video);       
formData.append("exerciseName", exercise);


    const token = localStorage.getItem("token");

    const res = await axios.post(API.SubmitExerciseVideo, formData, {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "multipart/form-data",
      },
    });

    if (!res.data?.message?.success) {
      alert("AI failed to analyze this video");
      return;
    }

    navigate("/ai-results", { state: res.data.message });
  } catch (err) {
    console.error("UPLOAD ERROR:", err.response?.data || err.message);
    alert("Error while analyzing video");
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
          <h2 className="text-xl font-semibold">Upload your Video</h2>
          <p className="text-sm text-gray-500">
            Select exercise & upload video (mp4 – max 10MB)
          </p>
        </div>

        {/* DropDown */}
        <select
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="w-full border rounded-lg p-2 text-sm"
        >
          <option value="">Select Exercise</option>
          {exercises.map((ex) => (
            <option key={ex} value={ex}>
              {ex.replace("_", " ")}
            </option>
          ))}
        </select>

        {/* Upload Area */}
        <div
          onClick={() => fileRef.current.click()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3 h-[170px]"
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
          disabled={!video || !exercise || loading}
          onClick={handleSend}
          className="w-full bg-primary-blue text-white py-2 rounded-lg font-medium disabled:opacity-40"
        >
          {loading ? "Analyzing..." : "Send"}
        </button>
      </div>
    </div>
  );
}
