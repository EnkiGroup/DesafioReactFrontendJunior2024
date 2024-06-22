import React, { useState } from "react";
import "./styles/global.css";
import { EditableDiv } from "./components/editableDiv";

export default function App() {
  const [todos, setTodos] = useState<
    Array<{
      id: number;
      content: string;
      completed: boolean;
    }>
  >([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const target = event.target as HTMLInputElement;
      const content = target.value.trim();

      if (content) {
        setTodos((prev) => [
          ...prev,
          {
            id: Date.now(),
            content,
            completed: false,
          },
        ]);

        target.value = "";
      }
    }
  };

  const handleRemoveTodo = (id: number) => {
    console.log(id);

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodos((prev) =>
      prev.map((todo) => ({
        ...todo,
        completed: event.target.checked,
      }))
    );
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  return (
    <>
      <section className="todoapp">
        <h1 id="title">Todos</h1>
        <header className="header">
          <label htmlFor="todo-input" className="input-container">
            <div className="toggle-all-container">
              {todos.length > 0 && (
                <>
                  <input
                    type="checkbox"
                    id="toggle-all"
                    className="toggle-all"
                    onChange={handleToggleAll}
                  />
                  <label htmlFor="toggle-all" />
                </>
              )}
            </div>

            <input
              type="text"
              id="todo-input"
              className="new-todo"
              placeholder="What needs to be done?"
              onKeyDown={handleAddTodo}
            />
          </label>
        </header>
        <main className="main">
          <ul id="todo-list" className="todo-list">
            {todos.map((todo, index) => (
              <li key={index} className="view">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={todo.completed}
                  onChange={() =>
                    setTodos((prev) =>
                      prev.map((item, i) =>
                        i === index
                          ? { ...item, completed: !item.completed }
                          : item
                      )
                    )
                  }
                />
                <EditableDiv defaultText={todo.content} />
                <button
                  className="destroy"
                  onClick={() => handleRemoveTodo(todo.id)}
                />
              </li>
            ))}
            {todos.length > 0 && (
              <footer id="footer" className="footer">
                <span className="todo-count">
                  <strong>
                    {todos.filter((todo) => !todo.completed).length}
                  </strong>{" "}
                  item(s) left
                </span>

                <ul className="filters">
                  <li className="selected">
                    <a href="#/">All</a>
                  </li>
                  <li>
                    <a href="#/active">Active</a>
                  </li>
                  <li>
                    <a href="#/completed">Completed</a>
                  </li>
                </ul>
                <button
                  className="clear-completed"
                  onClick={handleClearCompleted}
                >
                  Clear completed
                </button>
              </footer>
            )}
          </ul>
        </main>
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Created by <a href="https://github.com/pedrovs3">Pedro Silva</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
}
