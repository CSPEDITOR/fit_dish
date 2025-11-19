// diseaseSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch disease list
export const fetchDiseaseList = createAsyncThunk(
  "disease/fetchList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/diseases");
      return res.data; // expects array of objects like [{_id,name}]
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Error fetching diseases"
      );
    }
  }
);

const diseaseSlice = createSlice({
  name: "disease",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiseaseList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiseaseList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDiseaseList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default diseaseSlice.reducer;
