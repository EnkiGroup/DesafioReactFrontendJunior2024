import { TodosState } from "../TodosState"

export type DeleteTodoAction = {
    type: 'DELETE_TODO',
    id: string
}

export function handleDeleteTodo(state: TodosState, id: string): TodosState {
    const updatedTodos = state.todos.filter(todo => todo.id !== id);
    return { ...state, todos: updatedTodos };
}