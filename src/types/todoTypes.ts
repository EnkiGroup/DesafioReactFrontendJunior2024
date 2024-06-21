export interface ITodo {
  id: string;
  title: string;
  isDone: boolean;
}

export interface ITodoContext {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  pending: number;
  allTodosCompleted: boolean;
  setAllTodosCompleted: (completed: boolean) => void;
  completeAllTodos: () => void;
  completeTodos: (id: string) => void;
  createTodo: (title: string) => void;
  updateTodo: (id: string, title: string) => void;
  deleteTodo: (id: string) => void;
}
