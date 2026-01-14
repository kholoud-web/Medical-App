import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://diagnosis.runasp.net';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Async thunks
export const fetchDoctors = createAsyncThunk(
  'doctorManagement/fetchDoctors',
  async ({ search = '', isActive = null } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (isActive !== null) params.append('isActive', isActive);
      
      const response = await axios.get(
        `${BASE_URL}/DoctorManagement?${params.toString()}`,
        getAuthHeader()
      );
      
      // Transform API response to match component expectations
      const transformedData = response.data.map(doctor => ({
        id: doctor.id,
        name: doctor.fullName,
        avatar: doctor.profileImageUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23E5E7EB' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='40' fill='%239CA3AF' text-anchor='middle' dy='.3em'%3E👨‍⚕️%3C/text%3E%3C/svg%3E",
        specialty: doctor.specialty || "General",
        experience: `${doctor.experienceYears || 0} y`,
        gender: doctor.gender || "N/A",
        consultations: doctor.consultationsCount || 0,
        lastConsultation: doctor.lastConsultationDate 
          ? new Date(doctor.lastConsultationDate).toLocaleDateString() 
          : "N/A",
        status: doctor.status || "Inactive"
      }));
      
      return transformedData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctors');
    }
  }
);

export const getDoctorProfile = createAsyncThunk(
  'doctorManagement/getDoctorProfile',
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/DoctorManagement/${doctorId}`,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctor profile');
    }
  }
);

export const createDoctor = createAsyncThunk(
  'doctorManagement/createDoctor',
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/DoctorManagement/add-doctor`,
        doctorData,
        getAuthHeader()
      );
      
      // Auto-confirm doctor email if token is returned
      if (response.data.token && response.data.email) {
        try {
          await axios.post(
            `${BASE_URL}/Auth/confirm-email`,
            { email: response.data.email, token: response.data.token },
            { headers: { "Content-Type": "application/json" } }
          );
          return { ...response.data, emailConfirmed: true };
        } catch (confirmErr) {
          console.log("Doctor email confirmation error:", confirmErr.response?.data || confirmErr.message);
          // Doctor created but confirmation failed
          return { ...response.data, emailConfirmed: false };
        }
      }
      
      return response.data;
    } catch (error) {
      // Extract error message from API response
      const errorData = error.response?.data;
      let errorMessage = error.message;
      
      if (errorData) {
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.title) {
          errorMessage = errorData.title;
        } else if (errorData.errors) {
          // Handle validation errors - extract field errors
          const fieldErrors = Object.entries(errorData.errors)
            .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
            .join('\n');
          errorMessage = fieldErrors;
        }
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

export const deactivateDoctor = createAsyncThunk(
  'doctorManagement/deactivateDoctor',
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/DoctorManagement/status/${doctorId}`,
        {},
        getAuthHeader()
      );
      return { doctorId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to deactivate doctor');
    }
  }
);

export const resetDoctorPassword = createAsyncThunk(
  'doctorManagement/resetDoctorPassword',
  async ({ doctorId, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/DoctorManagement/reset-password/${doctorId}`,
        { NewPassword: newPassword },
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reset password');
    }
  }
);

// Slice
const doctorManagementSlice = createSlice({
  name: 'doctorManagement',
  initialState: {
    doctors: [],
    currentDoctor: null,
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
    clearCurrentDoctor: (state) => {
      state.currentDoctor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Doctors
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Doctor Profile
      .addCase(getDoctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDoctor = action.payload;
      })
      .addCase(getDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Doctor
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        // optional: push to list if API returns new doctor
        if (action.payload?.doctor) {
          state.doctors.unshift(action.payload.doctor);
        }
        const confirmMsg = action.payload?.emailConfirmed ? ' and email confirmed' : '';
        state.successMessage = `Doctor added successfully${confirmMsg}`;
        state.error = null;
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Deactivate Doctor
      .addCase(deactivateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deactivateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Doctor deactivated successfully';
        // Update doctor status in the list
        const doctor = state.doctors.find(d => d.id === action.payload.doctorId);
        if (doctor) {
          doctor.status = 'Inactive';
        }
      })
      .addCase(deactivateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset Password
      .addCase(resetDoctorPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetDoctorPassword.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = 'Password reset successfully';
      })
      .addCase(resetDoctorPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearCurrentDoctor } = doctorManagementSlice.actions;
export default doctorManagementSlice.reducer;