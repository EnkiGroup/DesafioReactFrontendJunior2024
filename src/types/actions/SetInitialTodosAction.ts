import { Todo } from "../Todo"
import { TodosState } from "../TodosState";

export type SetInitialTodosAction = {
    type: 'SET_INITIAL_TODOS',
    todos: Todo[]
}


export function handleSetInitialTodos(state: TodosState, todos: Todo[]): TodosState {
    const updatedTodos = [...state.todos, ...todos]; 
    return { ...state, todos: updatedTodos };
}