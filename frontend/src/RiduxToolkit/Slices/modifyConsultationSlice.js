import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://diagnosis.runasp.net";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export const fetchModifyData = createAsyncThunk(
  "modifyConsultation/fetch",
  async (consultationId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/Consultation/modify-data/${consultationId}`,
        getAuthHeader()
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
const modifyConsultationSlice = createSlice({
  name: "modifyConsultation",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearModifyData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModifyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchModifyData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchModifyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearModifyData } = modifyConsultationSlice.actions;
export default modifyConsultationSlice.reducer;
