import { configureStore } from "@reduxjs/toolkit";
import drugCheckerReducer from "./Slices/DrugCheckerSlice";
import authReducer from './Slices/authSlice'
import consultationReducer from './Slices/ConsultationSlice';

export const store = configureStore({
  reducer: {
    drugChecker: drugCheckerReducer,
    auth: authReducer,
   consultation: consultationReducer,

  },
});
