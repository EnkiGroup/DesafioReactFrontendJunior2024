import { TodosState } from "../TodosState"

export type DeleteTodoAction = {
    type: 'DELETE_TODO',
    id: number
}

export function handleDeleteTodo(state: TodosState, id: number): TodosState {
    const updatedTodos = state.todos.filter(todo => todo.id !== id);
    return { ...state, todos: updatedTodos };
}