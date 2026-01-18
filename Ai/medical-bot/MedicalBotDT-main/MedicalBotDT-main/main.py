from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional, List
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import Request
import joblib
import os

from MedicalTreeBot import MedicalTreeBot


# ---------- Load model files safely ----------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

try:
    model = joblib.load(os.path.join(BASE_DIR, "MedicalTreeModel.joblib"))
    le = joblib.load(os.path.join(BASE_DIR, "LabelEncoder.joblib"))
    feature_names = joblib.load(os.path.join(BASE_DIR, "features.joblib"))
except Exception as e:
    raise RuntimeError(f"Failed to load model files: {e}")


# ---------- App ----------
app = FastAPI(title="Medical Diagnosis Expert System")
templates = Jinja2Templates(directory="templates")


# ---------- Schemas ----------
class DiagnosisRequest(BaseModel):
    node_id: int
    answer: Optional[int] = None


class PredictionResult(BaseModel):
    disease: str
    confidence: float


class DiagnosisResponse(BaseModel):
    status: str
    node_id: Optional[int] = None
    question: Optional[str] = None
    results: Optional[List[PredictionResult]] = None


# ---------- Routes ----------
@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/diagnose/", response_model=DiagnosisResponse)
def diagnose(payload: DiagnosisRequest):
    bot = MedicalTreeBot(model, feature_names, le.classes_)
    bot.current_node = payload.node_id

    if payload.answer is not None:
        bot.submit_answer(payload.answer)

    if bot.is_leaf():
        return DiagnosisResponse(
            status="final",
            results=bot.get_result()
        )

    question = bot.get_question()
    if not question:
        return DiagnosisResponse(
            status="final",
            results=bot.get_result()
        )

    return DiagnosisResponse(
        status="question",
        node_id=int(bot.current_node),
        question=f"Do you have {question.replace('_', ' ')}?"
    )


# ---------- Local run ----------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)