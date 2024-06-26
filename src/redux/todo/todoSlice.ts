import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TodoItem, TodoProps } from '../../types/todoItems';

const initialState: TodoProps = {
  todo: [],
  activeTodo: [],
  completedTodo: [],
};

const updateTodoLists = (state: TodoProps) => {
  state.activeTodo = state.todo.filter((item) => !item.isDone);
  state.completedTodo = state.todo.filter((item) => item.isDone);
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
      state.todo = [newTodo, ...state.todo];
      state.activeTodo = state.todo.filter((item) => item.isDone === false);
      state.completedTodo = state.todo.filter((item) => item.isDone === true);
    },
    toggleIsDoneTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todo.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isDone: !item.isDone };
        } else {
          return item;
        }
      });
      state.todo = todo;
      updateTodoLists(state);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todo = state.todo.filter((item) => item.id !== action.payload);
      updateTodoLists(state);
    },
    toggleAllTodos: (state) => {
      const allDone = state.todo.every((item) => item.isDone === true);
      state.todo = state.todo.map((item) => ({ ...item, isDone: !allDone }));
      updateTodoLists(state);
    },
    clearAllTodos: (state) => {
      state.todo = state.todo.filter((item) => item.isDone === false);
      updateTodoLists(state);
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const { id, text } = action.payload;
      const todo = state.todo.map((item) => {
        if (item.id === id) {
          return { ...item, text };
        }
        return item;
      });
      state.todo = todo;
      updateTodoLists(state);
    },
  },
});

export const {
  addTodo,
  toggleIsDoneTodo,
  removeTodo,
  toggleAllTodos,
  clearAllTodos,
  editTodo,
} = todoSlice.actions;
