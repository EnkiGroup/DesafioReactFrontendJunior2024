import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TodoItem, TodoProps } from '../../types/todoItems';

const URL_API = process.env.REACT_APP_URL_API;

const initialState: TodoProps = {
  todo: [],
  activeTodo: [],
  completedTodo: [],
};

const updateTodoLists = (state: TodoProps) => {
  state.activeTodo = state.todo.filter((item) => !item.isDone);
  state.completedTodo = state.todo.filter((item) => item.isDone);
};

export const fetchTodoData = createAsyncThunk<TodoItem[]>(
  'todo/fetchTodoData',
  async () => {
    if (URL_API === undefined) throw new Error('URL API not found');

    const response = await fetch(URL_API);

    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }

    const data: TodoItem[] = await response.json();
    return data;
  }
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: TodoItem = {
        id: state.todo.length + 1,
        title: action.payload,
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
    editTodo: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const { id, title } = action.payload;
      const todo = state.todo.map((item) => {
        if (item.id === id) {
          return { ...item, title };
        }
        return item;
      });
      state.todo = todo;
      updateTodoLists(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoData.fulfilled, (state, action) => {
      state.todo = action.payload;
      updateTodoLists(state);
    });
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
