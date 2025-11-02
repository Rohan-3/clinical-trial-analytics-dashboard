import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@utils/api';

// --- Locations ---
export const fetchLocations = createAsyncThunk(
  'analytics/fetchLocations',
  async ({ startAfter } = {}, { rejectWithValue }) => {
    try {
      const query = startAfter ? `?startAfter=${startAfter}` : '';
      return await api(`/locations${query}`);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// --- Demographics ---
export const fetchDemographics = createAsyncThunk(
  'analytics/fetchDemographics',
  async ({ startAfter } = {}, { rejectWithValue }) => {
    try {
      const query = startAfter ? `?startAfter=${startAfter}` : '';
      return await api(`/demographics${query}`);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// --- Trials per City ---
export const fetchTrialsPerCity = createAsyncThunk(
  'analytics/fetchTrialsPerCity',
  async ({ startAfter, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const query = startAfter
        ? `?startAfter=${startAfter}&limit=${limit}`
        : `?limit=${limit}`;
      return await api(`/trials-per-city${query}`);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const initialState = {
  locations: [],
  demographics: { sexDistribution: [], ageBuckets: [] },
  trialsPerCity: [],
  status: 'idle',
  error: null,
  selectedYear: null,
};


const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchDemographics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDemographics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.demographics = action.payload;
      })
      .addCase(fetchDemographics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchTrialsPerCity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrialsPerCity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trialsPerCity = action.payload;
      })
      .addCase(fetchTrialsPerCity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setSelectedYear } = analyticsSlice.actions;
export default analyticsSlice.reducer;
