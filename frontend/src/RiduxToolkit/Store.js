import { configureStore } from "@reduxjs/toolkit";
import drugCheckerReducer from "./Slices/DrugCheckerSlice";
import authReducer from './Slices/authSlice'
import consultationReducer from './Slices/ConsultationSlice';
import inquiryReducer from './Slices/InquirySlice'
import modifyConsultationReducer from "./Slices/modifyConsultationSlice";
import helpReducer from './Slices/HelpSupportSlice'
import AdminDashboardReducer from './Slices/AdminDashboard';


export const store = configureStore({
  reducer: {
    drugChecker: drugCheckerReducer,
    auth: authReducer,
    consultation: consultationReducer,
    modifyConsultation: modifyConsultationReducer,
    inquiry:inquiryReducer,
    help:helpReducer,
    AdminDashboard:AdminDashboardReducer,
  },
}); 
