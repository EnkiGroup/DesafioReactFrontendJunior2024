import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from './todo/todoSlice';

export const store = configureStore({
  reducer: {
    todoList: todoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
