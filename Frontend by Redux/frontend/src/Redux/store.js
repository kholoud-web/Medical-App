// src/Redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import diagnosisReducer from "./Diagnosis/diagnosisSlice";

export const store = configureStore({
  reducer: {
    diagnosis: diagnosisReducer,
  },
});
