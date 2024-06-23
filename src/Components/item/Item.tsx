import React, { useState, KeyboardEvent } from "react";
import InterfaceTodo from "../../Interface/InterfaceTodo";
import axios from "axios";
import "./Item.css";

interface TaskProps {
  todo: InterfaceTodo;
  onDelete: (id: number) => void;
  onUpdate: (todo: InterfaceTodo) => void;
}

const Item: React.FC<TaskProps> = ({ todo, onDelete, onUpdate }) => {
  const [upTodo, setUpTodo] = useState<InterfaceTodo>(todo);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleCheckClicked = async () => {
    try {
      const updatedTodo = { ...upTodo, isDone: !upTodo.isDone };
      await axios.put(
        `http://localhost:5000/todos/${updatedTodo.id}`,
        updatedTodo
      );
      setUpTodo(updatedTodo);
      onUpdate(updatedTodo);
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

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleEditKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        const updatedTodo = { ...upTodo, title: editTitle };
        await axios.put(`http://localhost:5000/todos/${updatedTodo.id}`, updatedTodo);
        setUpTodo(updatedTodo);
        setIsEditing(false);
        onUpdate(updatedTodo);
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="container-item" onDoubleClick={handleDoubleClick}>
      <div className="content-item">
        <input
          className="input-select"
          type="checkbox"
          checked={upTodo.isDone}
          onChange={handleCheckClicked}
        />
        {isEditing ? (
          <input
            className="edit-input"
            type="text"
            value={editTitle}
            onChange={handleEditChange}
            onKeyDown={handleEditKeyDown}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <span className={upTodo.isDone ? "todo-completed todo-title" : "todo-title"}>
            {upTodo.title}
          </span>
        )}
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
