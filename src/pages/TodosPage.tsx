import React from "react";
import { useParams } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import { TodoHeader, TodoList, TodoFooter, Info } from "../components";
import styles from "./TodosPage.module.css";

const TodosPage = () => {
  const { filter } = useParams();
  const {
    todos,
    handleAddTodo,
    handleRemoveTodo,
    handleToggleTodo,
    handleToggleAll,
    handleClearCompleted,
  } = useTodos();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.isDone;
    } else if (filter === "completed") {
      return todo.isDone;
    }
    return true;
  });

  const remainingCount = todos.filter((todo) => !todo.isDone).length;
  const allCompleted = todos.length > 0 && todos.every((todo) => todo.isDone);

  return (
    <>
      <section className={styles.todoapp}>
        <h1 className={styles.title}>Todos</h1>
        <TodoHeader
          onAddTodo={(event) => {
            if (event.key === "Enter") {
              handleAddTodo(event.currentTarget.value);
              event.currentTarget.value = "";
            }
          }}
          onToggleAll={(event) => handleToggleAll(event.currentTarget.checked)}
          allCompleted={allCompleted}
          hasTodos={todos.length > 0}
        />
        <TodoList
          todos={filteredTodos}
          onToggleTodo={handleToggleTodo}
          onRemoveTodo={handleRemoveTodo}
        />
        {todos.length > 0 && (
          <TodoFooter
            remainingCount={remainingCount}
            filter={filter || "all"}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </section>
      <Info />
    </>
  );
};

export default TodosPage;
