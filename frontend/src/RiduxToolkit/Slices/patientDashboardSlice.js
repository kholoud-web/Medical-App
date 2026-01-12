import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://diagnosis.runasp.net';

// Axios instance with auth
const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Async Thunks
export const fetchRecentInquiries = createAsyncThunk(
  'patientDashboard/fetchRecentInquiries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/Inquiry/recent');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch recent inquiries');
    }
  }
);

export const fetchPendingInquiriesCount = createAsyncThunk(
  'patientDashboard/fetchPendingInquiriesCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/Inquiry/pending');
      return response.data.pendingInquiriesCount;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pending count');
    }
  }
);

export const fetchSymptomCountThisWeek = createAsyncThunk(
  'patientDashboard/fetchSymptomCountThisWeek',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/Consultation/symptom-count-this-week');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch symptom count');
    }
  }
);

export const fetchTopSymptomsThisWeek = createAsyncThunk(
  'patientDashboard/fetchTopSymptomsThisWeek',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/Consultation/top-symptoms-this-week');
      return response.data.symptom;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch top symptoms');
    }
  }
);

// Initial State
const initialState = {
  recentInquiries: [],
  pendingCount: null,
  symptomCount: null,
  topSymptom: null,
  loading: {
    recentInquiries: false,
    pendingCount: false,
    symptomCount: false,
    topSymptom: false,
  },
  error: {
    recentInquiries: null,
    pendingCount: null,
    symptomCount: null,
    topSymptom: null,
  },
};

// Slice
const patientDashboardSlice = createSlice({
  name: 'patientDashboard',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = {
        recentInquiries: null,
        pendingCount: null,
        symptomCount: null,
        topSymptom: null,
      };
    },
    resetDashboard: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch recent inquiries
    builder
      .addCase(fetchRecentInquiries.pending, (state) => {
        state.loading.recentInquiries = true;
        state.error.recentInquiries = null;
      })
      .addCase(fetchRecentInquiries.fulfilled, (state, action) => {
        state.loading.recentInquiries = false;
        state.recentInquiries = action.payload;
      })
      .addCase(fetchRecentInquiries.rejected, (state, action) => {
        state.loading.recentInquiries = false;
        state.error.recentInquiries = action.payload;
      });

    // Fetch Pending Inquiries Count
    builder
      .addCase(fetchPendingInquiriesCount.pending, (state) => {
        state.loading.pendingCount = true;
        state.error.pendingCount = null;
      })
      .addCase(fetchPendingInquiriesCount.fulfilled, (state, action) => {
        state.loading.pendingCount = false;
        state.pendingCount = action.payload;
      })
      .addCase(fetchPendingInquiriesCount.rejected, (state, action) => {
        state.loading.pendingCount = false;
        state.error.pendingCount = action.payload;
      });

    // Fetch Symptom Count This Week
    builder
      .addCase(fetchSymptomCountThisWeek.pending, (state) => {
        state.loading.symptomCount = true;
        state.error.symptomCount = null;
      })
      .addCase(fetchSymptomCountThisWeek.fulfilled, (state, action) => {
        state.loading.symptomCount = false;
        state.symptomCount = action.payload;
      })
      .addCase(fetchSymptomCountThisWeek.rejected, (state, action) => {
        state.loading.symptomCount = false;
        state.error.symptomCount = action.payload;
      });

    // Fetch Top Symptoms This Week
    builder
      .addCase(fetchTopSymptomsThisWeek.pending, (state) => {
        state.loading.topSymptom = true;
        state.error.topSymptom = null;
      })
      .addCase(fetchTopSymptomsThisWeek.fulfilled, (state, action) => {
        state.loading.topSymptom = false;
        state.topSymptom = action.payload;
      })
      .addCase(fetchTopSymptomsThisWeek.rejected, (state, action) => {
        state.loading.topSymptom = false;
        state.error.topSymptom = action.payload;
      });
  },
});

export const { clearErrors, resetDashboard } = patientDashboardSlice.actions;

export default patientDashboardSlice.reducer;

// Selectors
export const selectRecentInquiries = (state) =>
  state.patientDashboard.recentInquiries;
export const selectPendingCount = (state) =>
  state.patientDashboard.pendingCount;
export const selectSymptomCount = (state) =>
  state.patientDashboard.symptomCount;
export const selectTopSymptom = (state) =>
  state.patientDashboard.topSymptom;
export const selectDashboardLoading = (state) =>
  state.patientDashboard.loading;
export const selectDashboardErrors = (state) =>
  state.patientDashboard.error;