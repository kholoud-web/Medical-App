import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "@/Api/Api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://diagnosis.runasp.net/Auth/register", userData);
      return res.data;
    } catch (err) {
      console.log("Server response error:", err.response?.data);

      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }

      return rejectWithValue("Server Error");
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
      
      return res.data;
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {

      
      const clientUri = window.location.origin + "/reset-password";
      
      const res = await axios.post(API.ForgotPassword, { 
        email,
        clientUri: clientUri
      }, {
        headers: { "Content-Type": "application/json" },
      });
      
      
      const token = res.data.token || res.data.resetToken || null;
      
      if (token) {
        return { ...res.data, email, token };
      }

      return { ...res.data, email, token: "server-stored" };
      
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, { rejectWithValue }) => {
    try {
      let tokenToSend = resetData.token;
      
      if (!tokenToSend || tokenToSend === "" || tokenToSend === "server-stored") { 
        tokenToSend = "";
      }
      
      const res = await axios.post(API.ResetPassword, {
        email: resetData.email,
        token: tokenToSend,
        password: resetData.password,
        passwordConfirmation: resetData.passwordConfirmation,
      }, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (err) {
      
      if (err.response?.data?.message?.includes("Token is required") || 
          err.response?.data?.message?.includes("token")) {
        return rejectWithValue({ 
          ...err.response.data,
          message: "Password reset requires a token. Please contact support or use the forgot password link sent to your email." 
        });
      }
      
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    success: false,
    error: null,
    isAuthenticated: false,
    token: null,
    userId: null,
    email: null,
    role: null,
    expiresAt: null,
    resetToken: null,
    resetEmail: null,
  },
  reducers: {
    clearAuthState: (state) => {
      state.loading = false;
      state.success = false;
    },
    setResetToken: (state, action) => {
      state.resetToken = action.payload.token;
      state.resetEmail = action.payload.email;
    },
    clearResetToken: (state) => {
      state.resetToken = null;
      state.resetEmail = null;
    },
    logout: (state) => {
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
        state.error = action.payload;
        console.log("Server Error:", action.payload);
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
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        const emailToStore = action.payload.email || action.meta.arg;
        state.resetEmail = emailToStore;
        if (action.payload.token) {
          state.resetToken = action.payload.token;
        } else {
          state.resetToken = "server-stored";
        }
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearAuthState, logout, setResetToken, clearResetToken } = authSlice.actions;
export default authSlice.reducer;
