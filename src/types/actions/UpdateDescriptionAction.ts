import { TodosState } from "../TodosState";

export type UpdateDescriptionAction = {
    type: 'UPDATE_DESCRIPTION',
    id: number,
    newDescription: string
}

export function handleUpdateDescription(state: TodosState, id: number, newDescription: string): TodosState {
    const updatedTodos = state.todos.map(todo =>
      todo.id === id ? { ...todo, description: newDescription } : todo
    );
  
    return { ...state, todos: updatedTodos };
  }
