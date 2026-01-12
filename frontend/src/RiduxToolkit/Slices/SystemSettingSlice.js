import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthHeader, BASE_URL } from '../../Api/Api';

// Add Admin
export const addAdmin = createAsyncThunk(
  'systemSetting/addAdmin',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/SystemSettings/add-admin`,
        adminData,
        { headers: getAuthHeader() }
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
        { headers: getAuthHeader() }
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
        { headers: getAuthHeader() }
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
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      const backendMessage = error.response?.data?.message || error.response?.data;
      return rejectWithValue(backendMessage || 'Failed to fetch reply');
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
      });
  },
});

export const { clearError, clearSuccess, clearCurrentReply } = systemSettingSlice.actions;
export default systemSettingSlice.reducer;
