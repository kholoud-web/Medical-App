from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import pandas as pd
import pickle

# ----------------------------
# Load model & encoder
# ----------------------------
with open("Drug_effect.pkl", "rb") as f:
    model = pickle.load(f)

with open("onehot_encoder.pkl", "rb") as f:
    ohe = pickle.load(f)

# ----------------------------
# FastAPI app
# ----------------------------
app = FastAPI(title="Drug Effect Prediction API")
templates = Jinja2Templates(directory="templates")

categorical_features = [
    'drug_name',
    'rx_otc',
    'drug_classes',
    'csa',
    'alcohol',
    'generic_name',
    'medical_condition',
    'activity'
]

# ----------------------------
# Encoding function
# ----------------------------
def encode_input(features: dict) -> pd.DataFrame:
    input_df = pd.DataFrame([features])
    encoded_array = ohe.transform(input_df[categorical_features])
    encoded_df = pd.DataFrame(
        encoded_array,
        columns=ohe.get_feature_names_out(categorical_features),
        index=input_df.index
    )
    return encoded_df

# ----------------------------
# Routes
# ----------------------------
@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "prediction": None})

@app.post("/predict", response_class=HTMLResponse)
def predict(
    request: Request,
    drug_name: str = Form(...),
    rx_otc: str = Form(...),
    drug_classes: str = Form(...),
    csa: str = Form(...),
    alcohol: str = Form(...),
    generic_name: str = Form(...),
    medical_condition: str = Form(...),
    activity: str = Form(...)
):
    try:
        features = {
            "drug_name": drug_name,
            "rx_otc": rx_otc,
            "drug_classes": drug_classes,
            "csa": csa,
            "alcohol": alcohol,
            "generic_name": generic_name,
            "medical_condition": medical_condition,
            "activity": activity
        }
        df_encoded = encode_input(features)
        pred_label = model.predict(df_encoded)[0]
        return templates.TemplateResponse(
            "index.html",
            {"request": request, "prediction": pred_label, "values": features}
        )
    except Exception as e:
        return templates.TemplateResponse(
            "index.html",
            {"request": request, "prediction": f"Error: {str(e)}"}
        )
