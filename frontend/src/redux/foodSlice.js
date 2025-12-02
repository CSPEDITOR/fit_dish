// foodSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/foods`;

export const fetchFoods = createAsyncThunk(
  "foods/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data.data; // backend returns { success, data }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || "Failed to fetch foods"
      );
    }
  }
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const foodSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    clearFoods: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // fetch all foods
      .addCase(fetchFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFoods } = foodSlice.actions;
export default foodSlice.reducer;
