import { configureStore } from "@reduxjs/toolkit";
import drugCheckerReducer from "./Slices/DrugCheckerSlice";
import inquiryReducer from './Slices/InquirySlice'


export const store = configureStore({
  reducer: {
    drugChecker: drugCheckerReducer,
    inquiry : inquiryReducer,

  },
 

});
