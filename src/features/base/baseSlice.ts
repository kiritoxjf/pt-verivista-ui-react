import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type IDefense = {
  sign: number;
  email: number;
  search: number;
  report: number;
};

interface BaseState {
  icp: string;
  defense: IDefense;
  nowTime: number;
}

const initialState: BaseState = {
  icp: '',
  defense: {
    sign: 0,
    email: 0,
    search: 0,
    report: 0,
  },
  nowTime: new Date().getTime(),
};

const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setIcp: (state, action: PayloadAction<string>) => {
      state.icp = action.payload;
    },
    setDefense: (state, action: PayloadAction<IDefense>) => {
      state.defense = action.payload;
    },
    updateNowTime: (state) => {
      state.nowTime = new Date().getTime();
    },
  },
});

export const baseReducer = baseSlice.reducer;

export const { setIcp, setDefense, updateNowTime } = baseSlice.actions;
