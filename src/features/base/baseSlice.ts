import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface BaseState {
  icp: string;
}

const initialState: BaseState = {
  icp: '',
};

const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setIcp: (state, action: PayloadAction<string>) => {
      state.icp = action.payload;
    },
  },
});

export const baseReducer = baseSlice.reducer;

export const { setIcp } = baseSlice.actions;
