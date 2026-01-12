import { API } from "@/Api/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

//  AI
export const AiRateLimit = createAsyncThunk(
  "SystemSetting/AiRateLimit",
  async ({ maxRequestsPerDay }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        API.aiRate,
        { maxRequestsPerDay },
        getAuthHeader()
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const AiToggle = createAsyncThunk(
  "SystemSetting/AiToggle",
  async ({ enabled }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        API.aiToggle,
        { enabled },
        getAuthHeader()
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const doctorRatelimit = createAsyncThunk(
  "SystemSetting/doctorRatelimit",
  async ({ maxRequestsPerDay }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        API.doctorRateLimit,
        { maxRequestsPerDay },
        getAuthHeader()
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const workHours = createAsyncThunk(
  "SystemSetting/workHours",
  async ({ hours }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        API.doctorWorkHours,
        { hours },
        getAuthHeader()
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const SystemSettingSlice = createSlice({
  name: "SystemSetting",
  initialState: {
    loading: false,
    error: null,
    data: {
      aiRateLimit: null,
      aiEnabled: null,
      doctorRateLimit: null,
      workHours: null,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetData: (state) => {
      state.data = {
        aiRateLimit: null,
        aiEnabled: null,
        doctorRateLimit: null,
        workHours: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder

      // AI Rate Limit
      .addCase(AiRateLimit.pending, (state) => {
        state.loading = true;
      })
      .addCase(AiRateLimit.fulfilled, (state, action) => {
        state.loading = false;
        state.data.aiRateLimit = action.payload;
      })
      .addCase(AiRateLimit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // AI Toggle
      .addCase(AiToggle.pending, (state) => {
        state.loading = true;
      })
      .addCase(AiToggle.fulfilled, (state, action) => {
        state.loading = false;
        state.data.aiEnabled = action.payload;
      })
      .addCase(AiToggle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Doctor Rate Limit
      .addCase(doctorRatelimit.pending, (state) => {
        state.loading = true;
      })
      .addCase(doctorRatelimit.fulfilled, (state, action) => {
        state.loading = false;
        state.data.doctorRateLimit = action.payload;
      })
      .addCase(doctorRatelimit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Work Hours
      .addCase(workHours.pending, (state) => {
        state.loading = true;
      })
      .addCase(workHours.fulfilled, (state, action) => {
        state.loading = false;
        state.data.workHours = action.payload;
      })
      .addCase(workHours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default SystemSettingSlice.reducer;
