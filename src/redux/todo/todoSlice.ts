import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TodoItem {
  id: number;
  text: string;
  isDone: boolean;
}

interface TodoProps {
  todo: TodoItem[];
}

const initialState: TodoProps = {
  todo: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: TodoItem = {
        id: state.todo.length + 1,
        text: action.payload,
        isDone: false,
      };
      state.todo = [...state.todo, newTodo];
    },
  },
});
