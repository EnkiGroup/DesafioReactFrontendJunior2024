import { TodosState } from "../TodosState";

export type ToggleActiveAction = {
    type: 'TOGGLE_ACTIVE',
    id: number
}

export function handleToggleActive(state: TodosState, id: number): TodosState {
    const updatedTodos = state.todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    return { ...state, todos: updatedTodos };
  }