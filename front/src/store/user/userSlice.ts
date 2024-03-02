import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalError, User, ValidationError } from '../../types';
import { login, register } from './userThunk.ts';

export interface UserState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoad: boolean;
  loginError: GlobalError | null;
}

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginError: null,
  loginLoad: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state: UserState) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state: UserState) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state: UserState, action: PayloadAction<User>) => {
      state.registerLoading = false;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state: UserState, action) => {
      state.registerLoading = false;
      state.registerError = action.payload || null;
    });

    builder.addCase(login.pending, (state: UserState) => {
      state.loginLoad = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state: UserState, action: PayloadAction<User>) => {
      state.loginLoad = false;
      state.user = action.payload || null;
    });

    builder.addCase(login.rejected, (state: UserState, action) => {
      state.loginLoad = false;
      state.loginError = action.payload || null;
    });
  },
});

export const userReducer = userSlice.reducer;
export const {clearUser} = userSlice.actions;
