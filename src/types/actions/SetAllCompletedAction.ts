import { TodosState } from "../TodosState";

export type SetAllCompletedAction = {
    type: 'SET_ALL_COMPLETED'
}

export function handleSetAllCompleted(state: TodosState): TodosState {
  const allDone = state.todos.every(todo => todo.isDone);
  const updatedTodos = state.todos.map(todo => ({
    ...todo,
    isDone: !allDone
  }));
  return { ...state, todos: updatedTodos };
}