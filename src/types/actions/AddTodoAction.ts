import { Todo } from "../Todo";
import { TodosState } from "../TodosState";

export type AddTodoAction = {
    type: 'ADD_TODO',
    title: string
}

export function handleAddTodo(state: TodosState, title: string): TodosState {
    const newTodo: Todo = {
        id: generateRandomString(),
        title: title,
        isDone: false
      };
      return {...state, todos: [...state.todos, newTodo] }
}

function generateRandomString(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
  }
  return result;
}