import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://diagnosis.runasp.net";


// Helper to get token
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


// Async thunk for fetching admin dashboard data
export const fetchAdminDashboard = createAsyncThunk(
  "adminDashboard/fetchAdminDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/AdminDashboard`,
        getAuthHeader()
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const AdminDashboardSlice = createSlice({
    name:"AdminDashboard",
    initialState:{
      data:null,
      error:null,
      loading:false,
      lastFetched:null,
    },
    reducers:{
       // Clear dashboard data
    clearDashboard: (state) => {
      state.data = null;
      state.error = null;
      state.lastFetched = null;
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAdminDashboard.pending,(state)=>{
            state.loading = true;
            state.error=null
        })
        .addCase(fetchAdminDashboard.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            state.lastFetched = new Date().toISOString();
        })
        .addCase(fetchAdminDashboard.rejected,(state,action)=>{
           state.loading= false;
           state.error= action.payload;
        })
    }

})


// Selectors
export const selectAdminDashboard = (state) => state.adminDashboard.data;
export const selectDashboardLoading = (state) => state.adminDashboard.loading;
export const selectDashboardError = (state) => state.adminDashboard.error;
export const selectLastFetched = (state) => state.adminDashboard.lastFetched;


export const {clearDashboard , clearError} = AdminDashboardSlice.actions;

export default AdminDashboardSlice.reducer;
