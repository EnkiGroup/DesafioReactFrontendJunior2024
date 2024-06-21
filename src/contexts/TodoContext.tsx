import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ITodo, ITodoContext } from "../types/todoTypes";
import { v4 as uuid } from "uuid";

const apiUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: apiUrl,
});

const TodoContext = createContext<ITodoContext | undefined>(undefined);
TodoContext.displayName = "TodoContext";

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [pending, setPending] = useState<number>(0);
  const [allTodosCompleted, setAllTodosCompleted] = useState<boolean>(false);

  const createTodo = useCallback((title: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuid(), title, isDone: false },
    ]);
  }, []);

  const completeAllTodos = useCallback(() => {
    const allCompleted = todos.every((todo) => todo.isDone);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, isDone: !allCompleted }))
    );
  }, [todos]);

  const completeTodos = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }, []);

  const updateTodo = useCallback((id: string, title: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const clearTodos = useCallback(() => {
    setTodos([]);
  }, []);

  const fetchTodos = useCallback(async () => {
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    const pendingTodoCount = todos.filter((todo: ITodo) => !todo.isDone).length;
    setPending(pendingTodoCount);
    setAllTodosCompleted(pendingTodoCount === 0 && todos.length > 0);
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        pending,
        createTodo,
        allTodosCompleted,
        setAllTodosCompleted,
        completeAllTodos,
        completeTodos,
        deleteTodo,
        updateTodo,
        clearTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodoContext = (): ITodoContext => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoContextProvider");
  }
  return context;
};

export default useTodoContext;
