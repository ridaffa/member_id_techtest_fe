import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import awardPaginationReducer from './slices/awardSlice';

export const store = configureStore({
  reducer: {
    awardPagination: awardPaginationReducer
  },
  middleware: [thunk]
})
export type RootState = ReturnType<typeof store.getState>