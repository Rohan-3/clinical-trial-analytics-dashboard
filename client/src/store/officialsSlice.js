// client/src/store/officialsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@utils/api';

export const fetchOfficialsData = createAsyncThunk(
  'officials/fetchOfficialsData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api('/officials');
      console.log('fetchOfficialsData response:', response);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  allData: [], 
  data: [],
  pagination: { page: 1, limit: 6, totalItems: 0, totalPages: 1 },
  status: 'idle',
  error: null,
};

const officialsSlice = createSlice({
  name: 'officials',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      const newPage = action.payload;
      state.pagination.page = newPage;

      // slice data for the new page
      const start = (newPage - 1) * state.pagination.limit;
      const end = newPage * state.pagination.limit;
      state.data = state.allData.slice(start, end);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfficialsData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOfficialsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allData = Array.isArray(action.payload) ? action.payload : [];

        const totalItems = state.allData.length;
        const totalPages = Math.ceil(totalItems / state.pagination.limit);

        state.pagination = { ...state.pagination, totalItems, totalPages, page: 1 };
        state.data = state.allData.slice(0, state.pagination.limit);
      })
      .addCase(fetchOfficialsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = officialsSlice.actions;
export default officialsSlice.reducer;
