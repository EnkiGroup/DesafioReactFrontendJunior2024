import React from "react";
import { Link } from "react-router-dom";
import styles from "./TodoFooter.module.css";

interface TodoFooterProps {
  remainingCount: number;
  filter: string;
  onClearCompleted: () => void;
}

export const TodoFooter = ({
  remainingCount,
  filter,
  onClearCompleted,
}: TodoFooterProps) => (
  <footer className={styles.footer}>
    <span className={styles.todoCount}>
      <strong>{remainingCount}</strong> item(s) left
    </span>
    <ul className={styles.filters}>
      <li
        className={`${styles.filtersItem} ${
          filter === "all" ? styles.filtersItemSelected : ""
        }`}
      >
        <Link to="/all">All</Link>
      </li>
      <li
        className={`${styles.filtersItem} ${
          filter === "active" ? styles.filtersItemSelected : ""
        }`}
      >
        <Link to="/active">Active</Link>
      </li>
      <li
        className={`${styles.filtersItem} ${
          filter === "completed" ? styles.filtersItemSelected : ""
        }`}
      >
        <Link to="/completed">Completed</Link>
      </li>
    </ul>
    <button className={styles.clearCompleted} onClick={onClearCompleted}>
      Clear completed
    </button>
  </footer>
);
