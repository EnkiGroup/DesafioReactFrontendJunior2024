export interface ITodo {
  id: string;
  title: string;
  isDone: boolean;
}

export interface ITodoContext {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  pending: number;
  createTodo: (title: string) => void;
  allTodosCompleted: boolean;
  setAllTodosCompleted: (completed: boolean) => void;
  completeAllTodos: () => void;
}
