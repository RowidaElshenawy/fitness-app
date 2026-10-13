import type { TUser } from '@/features/auth/types/user';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TAuthState } from '../types/auth';
const initialState: TAuthState = {
  token: '',
  user: null,
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<{ token: string; user: TUser }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<TUser>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
    logout: (state) => {
      state.token = '';
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});
export const { loginAction, updateToken, updateUser, logout } = authSlice.actions;

export default authSlice.reducer;
