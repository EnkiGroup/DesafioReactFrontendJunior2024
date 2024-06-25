import React from "react";
import styles from "./TodoHeader.module.css";

interface TodoHeaderProps {
  onAddTodo: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onToggleAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  allCompleted: boolean;
  hasTodos: boolean;
}

export const TodoHeader = ({
  onAddTodo,
  onToggleAll,
  allCompleted,
  hasTodos,
}: TodoHeaderProps) => (
  <header className={styles.header}>
    <label htmlFor="todo-input" className={styles.inputContainer}>
      <div className={styles.toggleAllContainer}>
        {hasTodos && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className={styles.toggleAll}
              onChange={onToggleAll}
              checked={allCompleted}
              aria-label="toggle all"
            />
            <label htmlFor="toggle-all" className={styles.toggleAllLabel} />
          </>
        )}
      </div>
      <input
        type="text"
        id="todo-input"
        className={styles.newTodo}
        placeholder="What needs to be done?"
        onKeyDown={onAddTodo}
      />
    </label>
  </header>
);
