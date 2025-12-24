import React, { useRef } from "react";

export default function AiPerformance() {
  const [isCameraOn, setIsCameraOn] = React.useState(false);

  const videoRef = useRef(null)

 const stopCamera = () => {
  const stream = videoRef.current?.srcObject;

  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    videoRef.current.srcObject = null; 
  }

  setIsCameraOn(false);
};

 const startCameraStream = async () => {
  try {
  
    const oldStream = videoRef.current?.srcObject;
    if (oldStream) {
      oldStream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    await new Promise(res => setTimeout(res, 300));

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });

    videoRef.current.srcObject = stream;
    setIsCameraOn(true);
  } catch (error) {
    console.error("Camera error:", error.name);
  }
};






  return (
    <div className="space-y-2 bg-gradient-to-b  from-[#C6D8FD] to-[#207EFF] p-[1px] rounded-xl flex">
      <div className="bg-[#f7f7f7] rounded-xl p-14 flex flex-col h-full w-full space-y-6">
        <h3 className="text-[#505050] font-semibold text-xl">
          AI Performance Measurement
        </h3>
        <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-2 gap-5 ">
          {/* video */}
         <div className="relative bg-[#6B6B6B] min-h-[300px] rounded-lg overflow-hidden">
  <video
    ref={videoRef}
    autoPlay
    playsInline
    muted
    className="w-full h-full object-cover"
  />

  {!isCameraOn && (
  <div
    onClick={() => {
      setIsCameraOn(true); 
      startCameraStream();
    }}
    className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/40"
  >
    <img src="/insta.png" alt="" className="w-10 h-10 opacity-90" />
    <p className="text-white mt-2">Tap to start camera</p>
  </div>
)}

</div>

          {/* details */}
          <div className="bg-white border border-[#6B6B6B] p-4 rounded-lg space-y-3 ">
            <h2 className="text-[#505050] font-semibold">Metrics</h2>
            <p className="text-[#505050] font-semibold">Repetitions:<span className="text-[#6B6B6B]"> 12</span></p>
            <p className="text-[#505050] font-semibold">Posture Correction: <span className="text-[#6B6B6B]">8/12 correct</span></p>
            <p className="text-[#505050] font-semibold">Tips: <span className="text-[#6B6B6B]">“Raise your shoulder a bit”</span></p>
            <p className="text-[#505050] font-semibold">Time: <span className="text-[#6B6B6B]">05:20</span></p>
            {/* btn */}
            <div className="flex  lg:flex-wrap flex-wrap xl:flex-nowrap  gap-3 ">
              <button className="bg-[#207EFF]  w-full text-center py-2 px-4 rounded-lg border border-primary-blue text-sm font-medium text-primary-white hover:bg-white hover:text-primary-blue transition-all ease-in-out duration-300">
                Submit Result
              </button>
              <button
              onClick={stopCamera}
              className="bg-[#EF4444] w-full  text-center  py-2 px-4 rounded-lg border border-[#EF4444] text-sm font-medium text-primary-white hover:bg-white hover:text-[#EF4444] transition-all ease-in-out duration-300">
                Finish
              </button>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}
