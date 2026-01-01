import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://diagnosis.runasp.net";

// Helper to get token
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

//  Get all consultations (Doctor)
export const fetchConsultations = createAsyncThunk(
  "consultation/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/Consultation/all`,
        getAuthHeader()
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
//  Accept consultation
export const acceptConsultation = createAsyncThunk(
  "consultation/accept",
  async (consultationId, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/Consultation/accept/${consultationId}`,
        {},
        getAuthHeader()
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
// Reject consultation
export const rejectConsultation = createAsyncThunk(
  "consultation/reject",
  async ({ consultationId, reason, notes }, { rejectWithValue }) => {
    try {
      await axios.post(
        `${BASE_URL}/Consultation/reject/${consultationId}`,
        { reason, notes },
        getAuthHeader()
      );
      return consultationId;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
// Consultation Slice
const consultationSlice = createSlice({
    name: "consultation",
    initialState: {
        consultations: [],
        loading: false,
        error: null,
    },
    reducers: {},
    // Reducers for async actions to handle with states
extraReducers: (builder) => {
    builder
      // Fetch
    //   pending to loading, fulfilled to store data, rejected to store error
      .addCase(fetchConsultations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConsultations.fulfilled, (state, action) => {
        state.loading = false;
        state.consultations = action.payload;
      })
      .addCase(fetchConsultations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Accept
    //   Update consultation status to Accepted
      .addCase(acceptConsultation.fulfilled, (state, action) => {
        state.consultations = state.consultations.map((c) =>
          c.id === action.payload ? { ...c, status: "Accepted" } : c
        );
      })

      // Reject
    //   Update consultation status to Rejected
      .addCase(rejectConsultation.fulfilled, (state, action) => {
        state.consultations = state.consultations.map((c) =>
          c.id === action.payload ? { ...c, status: "Rejected" } : c
        );
      });
  },
});

export default consultationSlice.reducer;