import pandas as pd
import pickle

# تحميل الموديل مرة واحدة عند استيراد الملف
with open(r"Drug_effect.pkl", "rb") as f:
    model = pickle.load(f)

# --- دالة للتنبؤ ---
def predict_pregnancy_type(features: dict) -> str:
    """
    تأخذ dict لكل الأعمدة X الثمانية وتعيد predicted y.
    features مثال:
    {
        "drug_name": "Paracetamol",
        "rx_otc": "OTC",
        "drug_classes": "Analgesic",
        "csa": "No",
        "alcohol": "No",
        "generic_name": "Paracetamol",
        "medical_condition": "Pain",
        "activity": "Normal"
    }
    """
    # تحويل dict إلى DataFrame
    df_test = pd.DataFrame([features])

    # قائمة الأعمدة الأصلية التي رأها الموديل عند التدريب
    original_columns = model.feature_names_in_

    # تحويل الأعمدة إلى One-Hot
    df_test_encoded = pd.get_dummies(df_test)

    # إضافة الأعمدة المفقودة
    for col in original_columns:
        if col not in df_test_encoded:
            df_test_encoded[col] = 0

    # ترتيب الأعمدة كما عند التدريب
    df_test_encoded = df_test_encoded[original_columns]

    # التنبؤ
    y_pred = model.predict(df_test_encoded)[0]
    return str(y_pred)
