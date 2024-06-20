import React from "react";
import "./styles/global.css";

export default function App() {
  const [todos, setTodos] = React.useState<{
    list: string[];
    completed: string[];
  }>({
    list: [],
    completed: [],
  });

  const handleAddTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const input = event.target as HTMLInputElement;
      setTodos((prev) => ({ ...prev, list: [...prev.list, input.value] }));
      input.value = "";
    }
  };

  const handleRemoveTodo = (index: number) => {
    setTodos((prev) => ({
      ...prev,
      list: prev.list.filter((_, i) => i !== index),
    }));
  };

  const handleToggleTodo = (index: number) => {
    setTodos((prev) => {
      const todo = prev.list[index];
      return {
        list: prev.list.filter((_, i) => i !== index),
        completed: [...prev.completed, todo],
      };
    });
  };

  const handleToggleAll = () => {
    setTodos((prev) => ({
      list: [],
      completed: [...prev.completed, ...prev.list],
    }));
  };

  return (
    <section className="container">
      <h1 id="title">Todos</h1>

      <div className="input-container">
        {todos.list.length > 0 && (
          <button className="select-all" onClick={handleToggleAll}>
            ❯
          </button>
        )}
        <input
          type="text"
          id="todo-input"
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={handleAddTodo}
        />
      </div>

      <ul id="todo-list" className="todo-list">
        {todos.list.map((todo, index) => (
          <li key={index}>
            <div className="view">
              <label>{todo}</label>
              <button
                className="destroy"
                onClick={() => handleRemoveTodo(index)}
              />
            </div>
          </li>
        ))}
      </ul>

      <footer id="footer" className="footer">
        <span className="todo-count">
          <strong>{todos.list.length}</strong> item(s) left
        </span>
      </footer>

      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Created by <a href="https://github.com/pedrovs3">Pedro Silva</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </section>
  );
}
