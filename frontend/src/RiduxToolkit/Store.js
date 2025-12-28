import { configureStore } from "@reduxjs/toolkit";
import drugCheckerReducer from "./Slices/DrugCheckerSlice";

export const store = configureStore({
  reducer: {
    drugChecker: drugCheckerReducer,
  },
});
