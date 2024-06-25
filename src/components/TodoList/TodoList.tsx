import React from "react";
import { EditableDiv } from "../EditableDiv";
import styles from "./TodoList.module.css";

interface TodoListProps {
  todos: Array<{ id: string; title: string; isDone: boolean }>;
  onToggleTodo: (id: string) => void;
  onRemoveTodo: (id: string) => void;
}

export const TodoList = ({
  todos,
  onToggleTodo,
  onRemoveTodo,
}: TodoListProps) => (
  <ul className={styles.list}>
    {todos.map((todo) => (
      <li
        key={todo.id}
        className={`${styles.listItem} ${
          todo.isDone ? styles.listItemCompleted : ""
        }`}
      >
        <input
          type="checkbox"
          className={styles.toggle}
          checked={todo.isDone}
          onChange={() => onToggleTodo(todo.id)}
        />
        <EditableDiv defaultText={todo.title} completed={todo.isDone} />
        <button
          className={styles.destroy}
          onClick={() => onRemoveTodo(todo.id)}
        />
      </li>
    ))}
  </ul>
);
