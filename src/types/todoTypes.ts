export  interface ITodo {
  id: string;
  title: string;
  isDone: boolean;
}

export interface ITodoContext {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
}


