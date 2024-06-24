import { TodosState } from "../TodosState";

export type SetAllCompletedAction = {
    type: 'SET_ALL_COMPLETED'
}

export function handleSetAllCompleted(state: TodosState): TodosState {
  const allCompleted = state.todos.every(todo => todo.isCompleted);
  const updatedTodos = state.todos.map(todo => ({
    ...todo,
    isCompleted: !allCompleted
  }));
  return { ...state, todos: updatedTodos };
}