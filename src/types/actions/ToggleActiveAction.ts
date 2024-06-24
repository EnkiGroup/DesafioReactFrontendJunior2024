import { TodosState } from "../TodosState";

export type ToggleActiveAction = {
    type: 'TOGGLE_ACTIVE',
    id: string
}

export function handleToggleActive(state: TodosState, id: string): TodosState {
    const updatedTodos = state.todos.map(todo =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    return { ...state, todos: updatedTodos };
  }