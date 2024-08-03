import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './slices/companySlice';
import dealReducer from './slices/dealSlice';

const store = configureStore({
  reducer: {
    companies: companyReducer,
    deals: dealReducer,
  },
});

export default store;
