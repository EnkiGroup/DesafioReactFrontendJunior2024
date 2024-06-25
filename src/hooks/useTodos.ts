import { useState, useCallback, useEffect } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState<
    Array<{
      id: string;
      title: string;
      isDone: boolean;
    }>
  >([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = (title: string) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
        isDone: false,
      },
    ]);
  };

  const handleRemoveTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleToggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }, []);

  const handleToggleAll = useCallback((completed: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => ({
        ...todo,
        isDone: completed,
      }))
    );
  }, []);

  const handleClearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.isDone));
  }, []);

  return {
    todos,
    handleAddTodo,
    handleRemoveTodo,
    handleToggleTodo,
    handleToggleAll,
    handleClearCompleted,
  };
};
