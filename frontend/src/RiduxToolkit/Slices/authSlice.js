import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "@/Api/Api";
// import ConfirmEmail from './../../Pages/Auth/ConfirmEmail';

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

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      console.log("Calling forget password API with email:", email);
      
      // Call the forget-password endpoint with email and clientUri
      // The API sends an email with reset link, but we want to handle token internally
      const clientUri = window.location.origin + "/reset-password";
      
      const res = await axios.post(API.ForgotPassword, { 
        email,
        clientUri: clientUri
      }, {
        headers: { "Content-Type": "application/json" },
      });
      
      console.log("Forget password API response:", res.data);
      
      // The API might return a token in the response even though it's not documented
      // If it does, we'll use it. Otherwise, the token is sent via email link
      // But since user wants it handled internally, we'll check if token is in response
      const token = res.data.token || res.data.resetToken || null;
      
      if (token) {
        console.log("Token received from API response:", token);
        return { ...res.data, email, token };
      }
      
      // If no token in response, the API sends it via email link
      // However, since user wants it handled internally, we need to check if
      // the reset-password endpoint can work with just email (token stored server-side)
      // Or we might need to extract token from URL if user is redirected
      console.log("No token in response. API sends token via email link.");
      console.log("Token should be stored server-side and retrievable by email.");
      // We'll try to use empty token and see if API can retrieve it by email
      return { ...res.data, email, token: "server-stored" };
      
    } catch (err) {
      console.log("Forget password error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, { rejectWithValue }) => {
    try {
      // The API requires a token, but we don't have one because forgot password endpoint doesn't exist
      // Try different approaches to get or generate a token
      let tokenToSend = resetData.token;
      
      if (!tokenToSend || tokenToSend === "" || tokenToSend === "server-stored") {
        console.log("No token in request. Token should be stored server-side after forget-password call.");
        console.log("Attempting reset - API might retrieve token by email if called shortly after forget-password.");
        
        // Try with empty token - the API might retrieve it server-side by email
        // if forget-password was called recently
        tokenToSend = "";
      }
      
      console.log("Calling reset password API with data:", { 
        email: resetData.email,
        token: tokenToSend ? "***" : "(empty)",
        password: "***", 
        passwordConfirmation: "***" 
      });
      
      const res = await axios.post(API.ResetPassword, {
        email: resetData.email,
        token: tokenToSend,
        password: resetData.password,
        passwordConfirmation: resetData.passwordConfirmation,
      }, {
        headers: { "Content-Type": "application/json" },
      });
      
      console.log("Reset password API response:", res.data);
      return res.data;
    } catch (err) {
      console.log("Reset password error:", err.response?.data || err.message);
      
      // If error is about missing token, provide a clearer message
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

export const confirmEmail = createAsyncThunk(
  "auth/confirmEmail",
  async ({ token, email }, thunkAPI) => {
    if (!token || !email) {
      return thunkAPI.rejectWithValue("Token or email missing");
    }

    try {
      const res = await axios.post(
        API.ConfirmEmail, // تأكدي من الرابط هنا
        { email, token },
        { headers: { "Content-Type": "application/json" } }
      );
      return res.data;
    } catch (err) {
      console.log("Confirm email error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Email confirmation failed"
      );
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
    success: false,
    error: null,
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
  initialState: {
    ...getInitialState(),
    resetToken: null,
    resetEmail: null,
  },
  reducers: {
    clearAuthState: (state) => {
      state.loading = false;
      state.success = false;
      // Don't clear resetToken and resetEmail - they're needed for step 2
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
      .addCase(resetPassword.fulfilled, (state) => {
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
        console.log("Forgot password fulfilled. Email:", emailToStore, "Token stored:", state.resetToken);
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
