import http from '@/services/http';
import { API_ROUTES } from '@/utils/constants';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IDepartment {
  id: string;
  name: string;
}
export interface IRole {
  id: string;
  name: string;
}
export interface IUser {
  _id: string;
  email?: string;
}

export interface UserState {
  user: IUser | null;
  authenticated: null | boolean;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  authenticated: false,
  loading: true,
};

export const checkUser = createAsyncThunk('user/checkUser', async () => {
  const res = await http.get<{ user: IUser }>(API_ROUTES.USER.WHO_AM_I);
  return res.data.user;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.user = null;
      state.authenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUser.fulfilled, (state, action: PayloadAction<IUser | null>) => {
        state.loading = false;
        state.user = action.payload;
        state.authenticated = action.payload ? true : false;
      })
      .addCase(checkUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
