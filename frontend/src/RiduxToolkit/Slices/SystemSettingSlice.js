import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../Api/Api';

const BASE_URL = 'http://diagnosis.runasp.net';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Add Admin
export const addAdmin = createAsyncThunk(
  'systemSetting/addAdmin',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/SystemSettings/add-admin`,
        adminData,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      const backendMessage = error.response?.data?.message || error.response?.data;
      return rejectWithValue(backendMessage || 'Failed to add admin');
    }
  }
);

// Send Message (Contact Form)
export const sendMessage = createAsyncThunk(
  'systemSetting/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/SystemSettings/send-message`,
        messageData
      );
      return response.data;
    } catch (error) {
      const backendMessage = error.response?.data?.message || error.response?.data;
      return rejectWithValue(backendMessage || 'Failed to send message');
    }
  }
);

// Get Outside Requests
export const getOutsideRequests = createAsyncThunk(
  'systemSetting/getOutsideRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/SystemSettings/outside-requests`,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      const backendMessage = error.response?.data?.message || error.response?.data;
      return rejectWithValue(backendMessage || 'Failed to fetch outside requests');
    }
  }
);

// Send Reply
export const sendReply = createAsyncThunk(
  'systemSetting/sendReply',
  async ({ requestId, reply }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/SystemSettings/send-reply`,
        { requestId, reply },
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      const backendMessage = error.response?.data?.message || error.response?.data;
      return rejectWithValue(backendMessage || 'Failed to send reply');
    }
  }
);

// Get Reply by Request ID
export const getReply = createAsyncThunk(
  'systemSetting/getReply',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/SystemSettings/${requestId}/reply`,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      const backendMessage = error.response?.data?.message || error.response?.data;
      return rejectWithValue(backendMessage || 'Failed to fetch reply');
    }
  }
);

// AI Rate Limit
export const AiRateLimit = createAsyncThunk(
  'systemSetting/AiRateLimit',
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

// AI Toggle
export const AiToggle = createAsyncThunk(
  'systemSetting/AiToggle',
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

// Doctor Rate Limit
export const doctorRatelimit = createAsyncThunk(
  'systemSetting/doctorRatelimit',
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

// Work Hours
export const workHours = createAsyncThunk(
  'systemSetting/workHours',
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

// Slice
const systemSettingSlice = createSlice({
  name: 'systemSetting',
  initialState: {
    admins: [],
    outsideRequests: [],
    currentReply: null,
    loading: false,
    error: null,
    successMessage: null,
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
    clearSuccess: (state) => {
      state.successMessage = null;
    },
    clearCurrentReply: (state) => {
      state.currentReply = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Admin
      .addCase(addAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || 'Admin added successfully';
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send Message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || 'Message sent successfully';
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Outside Requests
      .addCase(getOutsideRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOutsideRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.outsideRequests = action.payload;
      })
      .addCase(getOutsideRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send Reply
      .addCase(sendReply.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendReply.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || 'Reply sent successfully';
      })
      .addCase(sendReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Reply
      .addCase(getReply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReply.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReply = action.payload;
      })
      .addCase(getReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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

export const { clearError, clearSuccess, clearCurrentReply } = systemSettingSlice.actions;
export default systemSettingSlice.reducer;
