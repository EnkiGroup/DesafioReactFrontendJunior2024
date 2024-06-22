import React, { useState } from "react";
import InterfaceTodo from "../Models/InterfaceTodo";
import axios from "axios";

interface TaskProps {
  todo: InterfaceTodo;
  onDelete: (id: number) => void;
}

const Item: React.FC<TaskProps> = ({ todo, onDelete }) => {
  const [upTodo, setUpTodo] = useState<InterfaceTodo>(todo);

  const handleCheckClicked = async () => {
    try {
      const updatedTodo = { ...upTodo, isDone: !upTodo.isDone };
      await axios.put(`http://localhost:5000/todos/${updatedTodo.id}`, updatedTodo);
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
    <div>
      <div>
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={handleCheckClicked}
        />
        <span
          style={{
            textDecoration: todo.isDone ? "line-through" : "none",
          }}
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={handleDeleteClicked}
        data-testid="deleteTodo"
        style={{
          fontSize: "1.2rem",
          width: "2.5rem",
          cursor: "pointer",
          color: "#F28CA7",
          opacity: "0.3",
          transition: "opacity 0.2s",
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Item;
