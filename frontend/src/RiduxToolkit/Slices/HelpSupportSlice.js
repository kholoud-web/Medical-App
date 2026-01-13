import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://diagnosis.runasp.net";


const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  
});
// get all admin
export const fetchAdmins = createAsyncThunk(
  "supportTicket/fetchAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/SupportTicket/all`,
        getAuthHeader()
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
        getAuthHeader()
      
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
        getAuthHeader()
       
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
        `${BASE_URL}/SupportTicket/reply`,
        { ticketId, reply },
        getAuthHeader()
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
      const response = await axios.get(
        `${BASE_URL}/SupportTicket/content/${ticketId}`,
        getAuthHeader()
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
    currentReply: null,
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
        state.currentReply = action.payload;
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
