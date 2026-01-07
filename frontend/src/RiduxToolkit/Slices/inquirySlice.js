import { API } from "@/Api/Api";
import Inquiries from "@/Pages/Doctor/Inquiries/Inquiries";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const token = "eyJzdWIiOiJjZGI4ZTBkMi0zMWM4LTQxNzItOTFhZi0yMDJiMWM5ZGRhMzAiLCJlbWFpbCI6ImZhcmhheWEwMDVAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJjZGI4ZTBkMi0zMWM4LTQxNzItOTFhZi0yMDJiMWM5ZGRhMzAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJQYXRpZW50IiwiZXhwIjoxNzY3NjI0ODU0LCJpc3MiOiJEaWFnbm9zaXNBUEkiLCJhdWQiOiJEaWFnbm9zaXNDbGllbnQifQ"

export const fetchInquiries = createAsyncThunk(
  "inquiry/fetchInquiries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://diagnosis.runasp.net/Inquiry/Inquiries",{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// submit new inquiry
export const submitInquiry= createAsyncThunk(
  "inquiry /submitInquiry",
  async(FormData,{rejectWithValue})=>{
    try {
      const response = await axios.post("http://diagnosis.runasp.net/Inquiry",FormData,{
        headers: 
        {Authorization: `Bearer ${token}`
      }
         
      })
      return response.data;
    }catch(error){
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchInquiryById = createAsyncThunk(
  "inquiry/fetchInquiryById",
  async (inquiryId, { rejectWithValue }) => { 
    try {
      const response = await axios.get( 
        `http://diagnosis.runasp.net/Inquiry/${inquiryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
       return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const initialState = {
  inquiries:[],
  selectedInquiry:null,
   currentInquiry: null,  
  doctorId: null,
  symptoms: "",
  description: "",
  notes: "",
  status: "",        
  date: null,        
  files: [],        
  rejectReason: null,
  rejectNotes: null,
  isModalOpen:false,
  loading:false,
  error:null,
  fetchingInquiry:false
};

const inquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {
    setDoctorId: (state, action) => {
      state.doctorId = action.payload;
    },
    setSymptoms: (state, action) => {
      state.symptoms = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    addFile: (state, action) => {
      state.files.push(action.payload);
    },
    removeFile: (state, action) => {
      state.files = state.files.filter((_, index) => index !== action.payload);
    },
    setRejectReason: (state, action) => {
      state.rejectReason = action.payload;
    },
    setRejectNotes: (state, action) => {
      state.rejectNotes = action.payload;
    },
    resetInquiry: () => initialState,
    setInquiry: (state, action) => {
      return { ...state, ...action.payload };
    },
     openInquiryModal: (state, action) => {
      state.data = action.payload; 
      state.isModalOpen = true;
    },
    closeInquiryModal: (state) => {
      state.isModalOpen = false;
    },

  },
  extraReducers:(builder)=>{
    builder 
    .addCase(fetchInquiries.pending,(state)=>{
      state.loading = true;
      state.error = null
    })
    .addCase(fetchInquiries.fulfilled,(state,action)=>{
      state.loading = false;
      state.inquiries = action.payload
      
    })
    .addCase(fetchInquiries.rejected,(state,action)=>{
      state.loading = false,
      state.error = action.payload;
    })
    
     .addCase(fetchInquiryById.pending, (state) => {
        state.fetchingInquiry = true;
        state.error = null;
      })
      .addCase(fetchInquiryById.fulfilled, (state, action) => {
        state.fetchingInquiry = false;
        // action.payload = { doctorId, symptoms, notes, status, date, files: [...URLs], description, ... }
        state.currentInquiry = action.payload;
         state.symptoms = action.payload.symptoms || "";
        state.description = action.payload.description || "";
        state.notes = action.payload.notes || "";
        state.status = action.payload.status || "";
        state.date = action.payload.date || null;
        state.doctorId = action.payload.doctorId || null;
      })
      .addCase(fetchInquiryById.rejected, (state, action) => {
        state.fetchingInquiry = false;
        state.error = action.payload;
      })

    .addCase(submitInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries.unshift(action.payload);
      })
      .addCase(submitInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const {
  setDoctorId,
  setSymptoms,
  setDescription,
  setStatus,
  setNotes,
  setDate,
  addFile,
  removeFile,
  setRejectReason,
  setRejectNotes,
  resetInquiry,
  setInquiry,
  openInquiryModal,
  closeInquiryModal
} = inquirySlice.actions;

// Export reducer
export default inquirySlice.reducer;
