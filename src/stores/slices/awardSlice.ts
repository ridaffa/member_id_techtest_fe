import { IResponse } from '../../interfaces/ResponseInterface';
import { IPagination } from '../../interfaces/PaginationInterface';
import { createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
export interface IAwardPaginationState {
  pagination: IPagination
  paginationLoading: boolean
  paginationError: string | null
}

const initialState: IAwardPaginationState = {
  pagination: {
    limit: 0,
    current_page: 0,
    total_pages: 0,
    data: []
  },
  paginationLoading: false,
  paginationError: null
}

export const fetchAwardsPagination = createAsyncThunk<IResponse, { jwt: string, page: number, limit: number, minPoint: number, maxPoint: number, awardTypes: number[] }, { rejectValue: string }>(
  'FETCH_AWARDS_PAGINATION',
  (obj, { rejectWithValue }) => {
    return fetch(`${process.env.REACT_APP_BE_URL}/awards?page=${obj.page}&limit=${obj.limit}&min_point=${obj.minPoint}&max_point=${obj.maxPoint}&award_types=${JSON.stringify(obj.awardTypes)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obj.jwt}`,
      },
    })
      .then((response) => {
        if (response.status === 401) throw new Error('unauthorized');
        if (!response.ok) throw new Error('failed to fetch awards');
        return response.json();
      })
      .then((data) => {
        return data;
      }
      )
      .catch((error) => {
        return rejectWithValue(error.message);
      }
      )
  }
)

export const awardPaginationSlice = createSlice({
  name: 'awardPagination',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAwardsPagination.pending, (state, action) => {
      state.paginationLoading = true;
    });
    builder.addCase(fetchAwardsPagination.fulfilled, (state, action) => {
      state.paginationLoading = false;
      state.pagination = action.payload.message;
    });
    builder.addCase(fetchAwardsPagination.rejected, (state, action) => {
      state.paginationLoading = false;
      state.paginationError = action.payload as string;
    });
  }
})

export default awardPaginationSlice.reducer;
export type AwardPaginationDispatch = ThunkDispatch<IAwardPaginationState, any, AnyAction>