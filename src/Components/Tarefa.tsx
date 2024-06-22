import React, { useState, useEffect } from "react";
import axios from "axios";
import Item from "./Item";
import TodoInterface from "../Models/InterfaceTodo";
import Footer from "./Footer";

const fetchTodos = () => {
  return axios.get("http://localhost:5000/todos")
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
      await axios.delete(`http://localhost:5000/todos${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  let filteredTodos = todos;

  if (props.filter === "active") {
    filteredTodos = todos.filter((todo) => !todo.isDone);
  } else if (props.filter === "completed") {
    filteredTodos = todos.filter((todo) => todo.isDone);
  }

  const incompleteTodosCount = todos.filter((todo) => !todo.isDone).length;

  if (isLoading)
    return <div>Loading...</div>;
  if (isError)
    return <div>Error</div>;

  return (
    <div>
      {filteredTodos.map((todo) => (
        <Item key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
      ))}
      <Footer contaItem={incompleteTodosCount} />
    </div>
  );
};

export default Tarefa;
