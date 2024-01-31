import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface BaseState {
  icp: string;
  lastTime: number;
}

const initialState: BaseState = {
  icp: '',
  lastTime: 0
};

const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setIcp: (state, action: PayloadAction<string>) => {
      state.icp = action.payload;
    },
    setLastTime: (state, action: PayloadAction<number>) => {
      state.lastTime = action.payload
    }
  },
});

export const baseReducer = baseSlice.reducer;

export const { setIcp, setLastTime } = baseSlice.actions;
