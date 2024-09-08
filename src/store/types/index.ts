import http from '@/services/http';
import { API_ROUTES } from '@/utils/constants';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IType {
  _id: string;
  name: string;
}

export interface TypeState {
  types: IType[] | null;
  loaded: boolean;
  loading: boolean;
}

const initialState: TypeState = {
  types: null,
  loaded: false,
  loading: true,
};

export const loadTypes = createAsyncThunk('user/loadTypes', async () => {
  const res = await http.get(API_ROUTES.TYPES.ALL);
  return res.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadTypes.fulfilled, (state, action: PayloadAction<IType[] | null>) => {
        state.loading = false;
        state.types = action.payload;
        state.loaded = action.payload ? true : false;
      })
      .addCase(loadTypes.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
