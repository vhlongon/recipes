import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '@prisma/client';

export type ContextUser = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'image'
> | null;

export interface UserState {
  isLoggedIn: boolean;
  user: ContextUser;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ContextUser>) => {
      if (!action.payload) return;

      state.isLoggedIn = true;
      const { firstName, lastName, email, image } = action.payload || {};
      state.user = {
        firstName: firstName ?? state.user?.firstName ?? '',
        lastName: lastName ?? state.user?.lastName ?? '',
        email: email ?? state.user?.email ?? '',
        image: image ?? state.user?.image ?? null,
      };
    },
    logout: state => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { logout, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
