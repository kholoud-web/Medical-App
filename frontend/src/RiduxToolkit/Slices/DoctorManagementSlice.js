import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthHeader, BASE_URL } from '../../Api/Api';

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
        { headers: getAuthHeader() }
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
        { headers: getAuthHeader() }
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
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      // Surface backend error details to UI for easier debugging
      const backendMessage = error.response?.data?.message || error.response?.data;
      return rejectWithValue(backendMessage || 'Failed to create doctor');
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
        { headers: getAuthHeader() }
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
        { headers: getAuthHeader() }
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
        state.successMessage = 'Doctor added successfully'; // custom message
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