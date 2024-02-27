import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type IDefense = {
  sign: number;
  email: number;
  search: number;
  report: number;
};

export type IStatistic = {
  online: number;
  report: number;
  sign: number;
};

interface BaseState {
  icp: string;
  defense: IDefense;
  nowTime: number;
  statistic: IStatistic;
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
  statistic: {
    online: 0,
    report: 0,
    sign: 0,
  },
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
    updateStatistic: (state, action: PayloadAction<IStatistic>) => {
      state.statistic = action.payload;
    },
  },
});

export const baseReducer = baseSlice.reducer;

export const { setIcp, setDefense, updateNowTime, updateStatistic } = baseSlice.actions;
