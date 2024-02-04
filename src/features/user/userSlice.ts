import { iUser } from '@/interfaces/Sign';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  logged: boolean;
  user: iUser;
  mode: string | null;
}

const initialState: UserState = {
  logged: false,
  user: {
    id: 0,
    name: '',
    email: '',
  },
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')
    : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state: UserState, action: PayloadAction<iUser>) => {
      state.logged = true;
      state.user = action.payload;
    },
    logout: (state: UserState) => {
      state.logged = false;
      state.user = {
        id: 0,
        name: '',
        email: '',
      };
    },
    changeMode: (state) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
        localStorage.setItem('mode', 'dark');
      } else {
        state.mode = 'light';
        localStorage.setItem('mode', 'light');
      }
    },
  },
});

export const { login, logout, changeMode } = userSlice.actions;

export default userSlice.reducer;
