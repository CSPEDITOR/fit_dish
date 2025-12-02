// redux/foodDetailSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/foods`;

/**
 * Fetch single food by id
 * Response expected: { success: true, data: { ...food } }
 */
export const fetchFoodById = createAsyncThunk(
  "foods/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const res = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg ||
          err.response?.data?.message ||
          "Failed to fetch food"
      );
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const foodDetailSlice = createSlice({
  name: "foodDetail",
  initialState,
  reducers: {
    clearFoodDetail: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFoodById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFoodDetail } = foodDetailSlice.actions;
export default foodDetailSlice.reducer;
