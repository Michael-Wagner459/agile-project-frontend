import { configureStore } from '@reduxjs/toolkit';
import companyReducer from '../slice/companySlice';
import dealReducer from '../slice/dealsSlice';

const store = configureStore({
  reducer: {
    companies: companyReducer,
    deals: dealReducer,
  },
});

export default store;
