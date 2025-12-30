import { configureStore } from "@reduxjs/toolkit";
import drugCheckerReducer from "./Slices/DrugCheckerSlice";
import authReducer from './Slices/authSlice'
import inquiryReducer from './Slices/inquirySlice.js'
 

export const store = configureStore({
  reducer: {
    drugChecker: drugCheckerReducer,
    auth: authReducer,
    inquiry:inquiryReducer,
  },
});
