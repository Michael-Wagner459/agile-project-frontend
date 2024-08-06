import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchCompanies = createAsyncThunk('companies/fetchCompanies', async () => {
  const response = await axios.get('/api/companies');
  return response.data;
});

export const fetchCompany = createAsyncThunk('companies/fetchCompany', async (id) => {
  const response = await axios.get(`/api/companies/${id}`);
  return response.data;
});

export const createCompany = createAsyncThunk('companies/createCompany', async (newCompany) => {
  const response = await axios.post('/api/companies', newCompany);
  return response.data;
});

export const updateCompany = createAsyncThunk('companies/updateCompany', async ({ id, updates }) => {
  const response = await axios.patch(`/api/companies/${id}`, updates);
  return response.data;
});

export const deleteCompany = createAsyncThunk('companies/deleteCompany', async (id) => {
  await axios.delete(`/api/companies/${id}`);
  return id;
});

const companySlice = createSlice({
  name: 'companies',
  initialState: {
    companies: [],
    selectedCompany: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //handle fetch companies
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //handle fetch company
      .addCase(fetchCompany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedCompany = action.payload;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //handle create company
      .addCase(createCompany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies.push(action.payload);
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //handle update company
      .addCase(updateCompany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedCompany = action.payload;
        const existingCompany = state.companies.find((company) => company._id === updatedCompany._id);
        if (existingCompany) {
          Object.assign(existingCompany, updatedCompany);
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //handle delete company
      .addCase(deleteCompany.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = state.companies.filter((company) => company._id !== action.payload);
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default companySlice.reducer;
