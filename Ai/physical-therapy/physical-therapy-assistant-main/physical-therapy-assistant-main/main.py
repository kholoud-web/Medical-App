"""from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI(title="Physiotherapy")

# Keep your existing JSON-based endpoint
class ExerciseData(BaseModel):
    exercise: str
    error: float 
    feedback: str

exercise_results = {}

@app.get("/")
def root():
    return {"message": "Physiotherapy Assistant is Live!"}

@app.post("/submit_exercise")
def submit_exercise(data: ExerciseData):
    exercise_results[data.exercise] = data.model_dump()
    return {"status": "success", "message": f"Data for {data.exercise} received"}

@app.get("/get_feedback/{exercise_name}")
def get_feedback(exercise_name: str):
    if exercise_name in exercise_results:
        return exercise_results[exercise_name]
    return {"status": "error", "message": "No data for this exercise"}

# New endpoint to accept video
@app.post("/submit_exercise_video")
async def submit_exercise_video(
    exercise: str = Form(...),
    file: UploadFile = File(...)
):
    # Read video bytes
    video_bytes = await file.read()

    # : Pass video_bytes to your model and compute error
    # For now, simulate
    import random
    error = round(random.uniform(0, 30), 2)
    if error < 10:
        feedback = "excellent"
    elif error < 20:
        feedback = "good"
    else:
        feedback = "safe_exceeded"

    # Save result
    exercise_results[exercise] = {"exercise": exercise, "error": error, "feedback": feedback}

    return JSONResponse({
        "status": "success",
        "exercise": exercise,
        "error": error,
        "feedback": feedback
    })"""

from fastapi import FastAPI, UploadFile, File, Form, Request, HTTPException
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import os
import random  # to simulate error angle for now

app = FastAPI(title="Physiotherapy")
templates = Jinja2Templates(directory="templates")

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

exercise_results = {}
UPLOAD_DIR = "uploaded_videos"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Threshold for angle in degrees
ANGLE_THRESHOLD = 10.0  # change this to your desired threshold


@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "prediction": None})


@app.post("/submit_exercise_video")
async def submit_exercise_video(
    exercise: str = Form(...),
    file: UploadFile = File(...)
):
    # Only allow .mp4
    if not file.filename.lower().endswith(".mp4") or file.content_type != "video/mp4":
        raise HTTPException(status_code=400, detail="Only .mp4 videos are allowed.")

    # Save uploaded file
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # Simulate angle error (replace this with actual video analysis later)
    error_angle = round(random.uniform(0, 20), 2)  # random error between 0-20°

    # Determine feedback based on threshold
    feedback = "Excellent" if error_angle <= ANGLE_THRESHOLD else "Angle Exceeded"

    # Store result
    exercise_results[exercise] = {
        "exercise": exercise,
        "error": error_angle,
        "feedback": feedback,
        "filename": file.filename
    }
    return JSONResponse(exercise_results[exercise])


@app.get("/get_feedback/{exercise}")
async def get_feedback(exercise: str):
    if exercise not in exercise_results:
        return JSONResponse({"status": "error", "message": "No feedback found for this exercise."})
    return JSONResponse(exercise_results[exercise])