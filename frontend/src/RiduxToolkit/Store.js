import { configureStore } from "@reduxjs/toolkit";
import drugCheckerReducer from "./Slices/DrugCheckerSlice";
import authReducer from './Slices/authSlice'
import consultationReducer from './Slices/ConsultationSlice';
import inquiryReducer from './Slices/inquirySlice.js'
import modifyConsultationReducer from "./Slices/modifyConsultationSlice";


export const store = configureStore({
  reducer: {
    drugChecker: drugCheckerReducer,
    auth: authReducer,
    consultation: consultationReducer,
    modifyConsultation: modifyConsultationReducer,
    inquiry:inquiryReducer,
  },
});
