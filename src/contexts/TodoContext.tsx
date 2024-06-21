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

  const createTodo = useCallback((title: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuid(), title, isDone: false },
    ]);
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

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        pending,
        createTodo,
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
