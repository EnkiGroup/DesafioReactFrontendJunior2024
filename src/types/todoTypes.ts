export interface ITodo {
  id: string;
  title: string;
  isDone: boolean;
}

export interface ITodoContext {
  todos: ITodo[];
  pending: number;
  allTodosCompleted: boolean;
  setTodos: (todos: ITodo[]) => void;
  setAllTodosCompleted: (completed: boolean) => void;
  completeAllTodos: () => void;
  completeTodos: (id: string) => void;
  createTodo: (title: string) => void;
  updateTodo: (id: string, title: string) => void;
  deleteTodo: (id: string) => void;
  clearTodos?: () => void;
}
