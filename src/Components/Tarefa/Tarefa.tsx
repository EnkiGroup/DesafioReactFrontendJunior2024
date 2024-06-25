import React, { useState, useEffect } from "react";
import axios from "axios";
import Item from "../item/Item";
import TodoInterface from "../../Interface/InterfaceTodo";
import Footer from "../Footer/Footer";
import "./Tarefa.css";

const fetchTodos = () => {
  return axios.get("https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos")
    .then((res) => res.data);
};

interface TodosProps {
  filter?: "all" | "active" | "completed";
}

const Tarefa: React.FC<TodosProps> = (props) => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteTodo = async (id: number) => {
    try {
      await axios.delete(`https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdateTodo = (updatedTodo: TodoInterface) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const clearCompleted = async () => {
    try {
      const completedTodos = todos.filter(todo => todo.isDone);
      await Promise.all(completedTodos.map(todo => axios.delete(`https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos/${todo.id}`)));
      setTodos(prevTodos => prevTodos.filter(todo => !todo.isDone));
    } catch (error) {
      console.error("Error clearing completed todos:", error);
    }
  };

  let filteredTodos = todos;

  if (props.filter === "active") {
    filteredTodos = todos.filter((todo) => !todo.isDone);
  } else if (props.filter === "completed") {
    filteredTodos = todos.filter((todo) => todo.isDone);
  }

  const incompleteTodosCount = todos.filter((todo) => !todo.isDone).length;

  if (isLoading) return <div className="load">Loading...</div>;
  if (isError) return <div className="load">Error</div>;

  return (
    <div>
      {filteredTodos.map((todo) => (
        <Item key={todo.id} todo={todo} onDelete={handleDeleteTodo} onUpdate={handleUpdateTodo} />
      ))}
      {todos.length > 0 && <Footer contaItem={incompleteTodosCount} clearCompleted={clearCompleted} />}
    </div>
  );
};

export default Tarefa;
