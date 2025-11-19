// avoidFoodSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAvoidFoodList = createAsyncThunk(
  "avoidFood/fetchList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/avoid-food");
      return res.data;   // expects array of objects
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching avoid-food");
    }
  }
);

const avoidFoodSlice = createSlice({
  name: "avoidFood",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvoidFoodList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvoidFoodList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAvoidFoodList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default avoidFoodSlice.reducer;
