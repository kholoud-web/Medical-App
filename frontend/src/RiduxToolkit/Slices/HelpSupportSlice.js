import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("Q2ZESjhLRnYwYVB3ckROQ29GaWZKQ0s4NHpKU05xcm9iME4zSFUxUnZJSEpaekNhRzFlWEU1QkJEbXJXUVhYMk9ydjN3L3gwd2V4OXU5RVR2RnZKdkpldFV6TFBYb3RKK0kvZUtUTmhWMFY3OW42QkRENDQ2QjQ1ZUl1MHVPRWZQaGJ4dXNYNnBWZjhUOEtJbDRtQ0ozYXNpOW9XUmprRDA3azBLUnpMTHNTeXVtSy9GQzUwbmR1bTJ1YTIyMTVxd2Rva3hSdE8vZmdPL2J2eEFRa2hTVW91emdlVFFkbzUzNmxuek1VajhXaklnZ2RZUW5ubGxJUWdVRHI3enBJRi9xY0lvZz09");

// get all admin
export const fetchAdmins = createAsyncThunk(
  "supportTicket/fetchAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://diagnosis.runasp.net/SupportTicket/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//create ticket
export const createTicket = createAsyncThunk(
  "SupportTicket/createTicket",
  async ({ subject, details }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://diagnosis.runasp.net/SupportTicket/create",
        { subject, details },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get faqs
export const fetchFaqs = createAsyncThunk(
  "help/faqs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://diagnosis.runasp.net/Help/faqs?Type=Patient",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//send reply
export const sendReply = createAsyncThunk(
  "help/sendReply",
  async ({ ticketId, reply }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://diagnosis.runasp.net/Help/faqs?Type=Patient",
        { ticketId, reply },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get content
export const fetchContentById = createAsyncThunk(
  "help/fetchContentById",
  async (ticketId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://diagnosis.runasp.net/SupportTicket/content/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const helpSlice = createSlice({
  name: "help",
  initialState: {
    subject: "",
    details: "",
    ticketId: "",
    reply: "",
    loading: false,
    error: null,
    inquiries: [],
  },
  reducers: {
    setSubject: (state, action) => {
      state.subject = action.payload;
    },
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    setTicketId: (state, action) => {
      state.ticketId = action.payload;
    },
    setReply: (state, action) => {
      state.reply = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(fetchContentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload;
      })
      .addCase(fetchContentById.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(sendReply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendReply.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload;
              console.log("fetchFaqs fulfilled with:", action.payload); // ✅ Add this log

      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setDetails, setReply, setSubject, setTicketId } =
  helpSlice.actions;

export default helpSlice.reducer;
