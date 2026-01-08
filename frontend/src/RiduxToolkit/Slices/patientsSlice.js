import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/Api/patientApi";

// جلب بيانات المرضى
export const fetchPatients = createAsyncThunk(
  "data/fetchPatients",
  async ({ search = "", pageNumber = 1, pageSize = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.post("/PatientManagement/Get-Patients", {
        patientName: search,
        pageNumber,
        pageSize,
      });
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// جلب طلبات المساعدة
export const fetchHelpRequests = createAsyncThunk(
  "data/fetchHelpRequests",
  async ({ search = "", pageNumber = 1, pageSize = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get("/SupportTicket/all", {
        searchTerm: search,
        pageNumber,
        pageSize,
      });
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// حذف / تعطيل مريض
export const removePatient = createAsyncThunk(
  "data/removePatient",
  async (id, { rejectWithValue }) => {
    try {
      await api.patch(`/PatientManagement/status/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const patientsSlice = createSlice({
  name: "data",
  initialState: {
    patients: [],
    helpRequests: [],
    loadingPatients: false,
    loadingHelpRequests: false,
    errorPatients: null,
    errorHelpRequests: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // المرضى
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loadingPatients = true;
        state.errorPatients = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loadingPatients = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loadingPatients = false;
        state.errorPatients = action.payload;
      })
      .addCase(removePatient.fulfilled, (state, action) => {
        state.patients = state.patients.filter(p => p.id !== action.payload);
      });

    // طلبات المساعدة
    builder
      .addCase(fetchHelpRequests.pending, (state) => {
        state.loadingHelpRequests = true;
        state.errorHelpRequests = null;
      })
      .addCase(fetchHelpRequests.fulfilled, (state, action) => {
        state.loadingHelpRequests = false;
        state.helpRequests = action.payload;
      })
      .addCase(fetchHelpRequests.rejected, (state, action) => {
        state.loadingHelpRequests = false;
        state.errorHelpRequests = action.payload;
      });
  },
});

export default patientsSlice.reducer;
