import { API } from "@/Api/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const checkDrugChecker = createAsyncThunk(
  "drugChecker/check",
  async (drugName, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.CheckDrugChecker, {
        drugName,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const drugCheckerSlice = createSlice({
  name: "drugChecker",
  initialState: {
    drugChecker: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkDrugChecker.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(checkDrugChecker.fulfilled, (state, action) => {
        state.loading = false;
        state.drugChecker = action.payload;
      })
      .addCase(checkDrugChecker.rejected, (state, action) => {
        state.loading = false;
        state.drugChecker = [];
        state.error = action.payload || action.error.message;
      });
  },
});

export default drugCheckerSlice.reducer;
