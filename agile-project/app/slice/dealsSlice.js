import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchDeals = createAsyncThunk('deals/fetchDeals', async () => {
  const response = await axios.get('/api/deals');
  return response.data;
});

export const fetchDeal = createAsyncThunk('deals/fetchDeal', async (id) => {
  const response = await axios.get(`/api/deals/${id}`);
  return response.data;
});

export const createDeal = createAsyncThunk('deals/createDeal', async (newDeal) => {
  const response = await axios.post('/api/deals', newDeal);
  return response.data;
});

export const updateDeals = createAsyncThunk('deals/updateDeals', async ({ id, updates }) => {
  const response = await axios.patch(`/api/deals/${id}`, updates);
  return response.data;
});

export const updateDealStage = createAsyncThunk('deals/updateDealStage', async ({ id, stage }) => {
  const response = await axios.put(`/api/deals/${id}/stage`, { stage });
  return response.data;
});

export const deleteDeal = createAsyncThunk('deals/deleteDeal', async (id) => {
  await axios.delete(`/api/deals/${id}`);
  return id;
});

const dealSlice = createSlice({
  name: 'deals',
  initialState: {
    deals: [],
    selectedDeal: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //handle fetch deals
      .addCase(fetchDeals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deals = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //handle fetch deal
      .addCase(fetchDeal.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedDeal = action.payload;
      })
      .addCase(fetchDeal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //handle create deal
      .addCase(createDeal.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deals.push(action.payload);
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //handle update deal
      .addCase(updateDeals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateDeals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedDeal = action.payload;
        const existingDeal = state.deals.find((deal) => deal._id === updatedDeal._id);
        if (existingDeal) {
          Object.assign(existingDeal, updatedDeal);
        }
      })
      .addCase(updateDeals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //update deal stage
      .addCase(updateDealStage.pending, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateDealStage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedStage = action.payload;
        const existingDeal = state.deals.find((deal) => deal._id === updatedStage._id);
        if (existingDeal) {
          Object.assign(existingDeal, updatedStage);
        }
      })
      .addCase(updateDealStage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //handle delete deal
      .addCase(deleteDeal.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deals = state.deals.filter((deal) => deal._id !== action.payload);
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dealSlice.reducer;
