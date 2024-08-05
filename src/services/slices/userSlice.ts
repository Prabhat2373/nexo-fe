import { User } from '@/types/profile/profile.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Avatar {
  public_id: string;
  url: string;
}

const initialState = {
  isLoggedIn: false,
  user: {},
  role: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LoginUser: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.role = action.payload?.role;
    },
    LogoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = [];
      state.role = '';
    },
    setStoreUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      console.log('userInSlice', user);
      state.user = user;
    }
  }
});

export const { LogoutUser, LoginUser, setStoreUser } = userSlice.actions;

export default userSlice.reducer;
