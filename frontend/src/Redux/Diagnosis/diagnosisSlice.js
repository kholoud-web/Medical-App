// src/Redux/Diagnosis/diagnosisSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk وهمي للتجربة
export const analyzeWithAI = createAsyncThunk(
  "diagnosis/analyzeWithAI",
  async (text, { rejectWithValue }) => {
    try {
      // رابط API وهمي، لن يسبب توقف الصفحة
      const res = await fetch("https://example.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      // للتجربة نعيد data وهمي لو الرابط فشل
      if (!res.ok) {
        return {
          title: "Sample Diagnosis",
          diagnosis: "This is a sample diagnosis result.",
          symptoms: ["Symptom 1", "Symptom 2"],
          clinicalFindings: ["Finding A"],
          medications: ["Med A 1x"],
        };
      }

      const data = await res.json();
      return data;
    } catch (err) {
      // إعادة بيانات وهمية للتجربة
      return {
        title: "Sample Diagnosis",
        diagnosis: "This is a sample diagnosis result.",
        symptoms: ["Symptom 1", "Symptom 2"],
        clinicalFindings: ["Finding A"],
        medications: ["Med A 1x"],
      };
    }
  }
);

const diagnosisSlice = createSlice({
  name: "diagnosis",
  initialState: {
    inputText: "",
    diagnosisData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setInputText(state, action) {
      state.inputText = action.payload;
    },
    clearAll(state) {
      state.inputText = "";
      state.diagnosisData = null;
      state.error = null;
      state.loading = false;
    },
    setDiagnosisData(state, action) {
      state.diagnosisData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeWithAI.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.diagnosisData = null;
      })
      .addCase(analyzeWithAI.fulfilled, (state, action) => {
        state.loading = false;
        state.diagnosisData = action.payload;
      })
      .addCase(analyzeWithAI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to analyze";
      });
  },
});

export const { setInputText, clearAll, setDiagnosisData } = diagnosisSlice.actions;
export default diagnosisSlice.reducer;
