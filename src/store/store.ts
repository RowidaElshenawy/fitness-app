import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/auth.slice';
export const store = configureStore({
  reducer: {
    // _placeholder: (state = {}) => state,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
