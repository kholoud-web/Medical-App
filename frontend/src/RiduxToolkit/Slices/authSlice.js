import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "@/Api/Api";

const BASE_URL = "http://diagnosis.runasp.net";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/Auth/register`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (err) {
      console.log("Server response error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(API.Login, credentials, {
        headers: { "Content-Type": "application/json" },
      });
      
      // Store token in localStorage
      if (res.data.success && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("expiresAt", res.data.expiresAt);
      }
      
      return res.data;
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Load initial state from localStorage
const getInitialState = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const expiresAt = localStorage.getItem("expiresAt");

  return {
    loading: false,
    error: null,
    success: false,
    isAuthenticated: !!token,
    token: token || null,
    userId: userId || null,
    email: email || null,
    role: role || null,
    expiresAt: expiresAt || null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    clearAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    logout: (state) => {
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("expiresAt");
      
      // Reset state
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      state.email = null;
      state.role = null;
      state.expiresAt = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        console.log("Server Error:", action.payload);
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (action.payload.success) {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.userId = action.payload.userId;
          state.email = action.payload.email;
          state.role = action.payload.role;
          state.expiresAt = action.payload.expiresAt;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { clearAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
