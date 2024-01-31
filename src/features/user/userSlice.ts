import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  logged: boolean
  user: string
  mode: string | null
}

const initialState: UserState = {
  logged: false,
  user: '',
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
    login: (state: UserState, action: PayloadAction<string>) => {
      state.logged = true
      state.user = action.payload
    },
    logout: (state: UserState) => {
      state.logged = false
      state.user = ''
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
