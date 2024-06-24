import { TodosState } from "../TodosState"

export type ClearCompletedAction = {
    type: 'CLEAR_COMPLETED'
}

export function handleClearCompleted(state: TodosState): TodosState {
    const clearCompletedTodos = state.todos.filter(todo => todo.isDone === false);
    return { ...state, todos: clearCompletedTodos };
}