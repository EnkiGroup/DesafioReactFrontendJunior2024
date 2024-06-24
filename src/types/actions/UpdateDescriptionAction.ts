import { TodosState } from "../TodosState";

export type UpdateDescriptionAction = {
    type: 'UPDATE_DESCRIPTION',
    id: string,
    newTitle: string
}

export function handleUpdateDescription(state: TodosState, id: string, newTitle: string): TodosState {
    const updatedTodos = state.todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
  
    return { ...state, todos: updatedTodos };
  }
