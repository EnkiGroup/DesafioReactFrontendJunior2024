export interface TodoItem {
  id: number;
  title: string;
  isDone: boolean;
}

export interface TodoProps {
  todo: TodoItem[];
  activeTodo: TodoItem[];
  completedTodo: TodoItem[];
}
