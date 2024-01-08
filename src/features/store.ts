import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import userReducer from '@/features/user/userSlice';
import { counterReducer } from '@/features/counterSlice';
import { baseReducer } from '@/features/base/baseSlice';

const store = configureStore({
  reducer: {
    // Add your reducers here
    counter: counterReducer,
    user: userReducer,
    base: baseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
