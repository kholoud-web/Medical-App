import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearAuthState: (state) => {
      state.loading = false;
      state.success = false;
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
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
