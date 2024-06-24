import { Todo } from "../Todo";
import { TodosState } from "../TodosState";

export type AddTodoAction = {
    type: 'ADD_TODO',
    description: string
}

export function handleAddTodo(state: TodosState, description: string): TodosState {
    const newTodo: Todo = {
        id: Math.random(),
        description: description,
        isCompleted: false
      };
    console.log(state.todos)
      return {...state, todos: [...state.todos, newTodo] }
}