export interface TodoItem {
  id: number;
  text: string;
  isDone: boolean;
}

export interface TodoProps {
  todo: TodoItem[];
  activeTodo: TodoItem[];
  completedTodo: TodoItem[];
}
