import React, { useState } from "react";
import InterfaceTodo from "../../Interface/InterfaceTodo";
import axios from "axios";
import "./Item.css";

interface TaskProps {
  todo: InterfaceTodo;
  onDelete: (id: number) => void;
}

const Item: React.FC<TaskProps> = ({ todo, onDelete }) => {
  const [upTodo, setUpTodo] = useState<InterfaceTodo>(todo);

  const handleCheckClicked = async () => {
    try {
      const updatedTodo = { ...upTodo, isDone: !upTodo.isDone };
      await axios.put(
        `http://localhost:5000/todos/${updatedTodo.id}`,
        updatedTodo
      );
      setUpTodo(updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteClicked = async () => {
    try {
      await axios.delete(`http://localhost:5000/todos/${upTodo.id}`);
      onDelete(upTodo.id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="container-item">
      <div className="content-item">
        <input
          className="input-select"
          type="checkbox"
          checked={upTodo.isDone}
          onChange={handleCheckClicked}
        />
        <span className={upTodo.isDone ? "todo-completed todo-title" : "todo-title"}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={handleDeleteClicked}
        data-testid="deleteTodo"
        className="botaoDelete"
      >
        x
      </button>
    </div>
  );
};

export default Item;
