import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import './app.css'; // Assuming you have stylesheets app.css and index.css
import './index.css';

export default function App() {
  const [todoText, setTodoText] = useState<string>("");
  const [newText, setNewText] = useState<string>("");
  const [isInputEntered, setIsInputEntered] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value); // Atualiza o estado com o valor do input
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && todoText.trim() !== '') {
      setNewText(todoText);
      setIsInputEntered(true); // Define como true apenas se houver texto no input
      setTodoText("");
    }
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter); // Update active filter state
  };

  return (
    <div>
      <section id="root" className="todoapp">
        <header className="header" data-testid="header">
          <h1>todos</h1>
          <div className="input-container">
            <input
              id="todo-input"
              className="new-todo"
              type="text"
              data-testid="text-input"
              placeholder="What needs to be done?"
              value={todoText}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <label className="visually-hidden" htmlFor="todo-input">
            </label>
          </div>
        </header>
        <main className="main" data-testid="main">
          {isInputEntered && (
            <div className="toggle-all-container">
              <input className="toggle-all" type="checkbox" data-testid="toggle-all" />
              <label data-testid="todo-item-label">{todoText}</label>
              <button className="destroy" data-testid="todo-item-button"></button>
            </div>
          )}
          <div className="toggle-all-container">
            {isInputEntered && (
              <input className="toggle-all" type="checkbox" data-testid="toggle-all" />
            )}
            <label className="toggle-all-label" htmlFor="toggle-all">
            </label>
          </div>
          <ul className="todo-list" data-testid="todo-list">
            <li className="completed" data-testid="todo-item">
              {isInputEntered && (
                <div className="view">
                  <input className="toggle" type="checkbox" data-testid="todo-item-toggle" />
                  <label data-testid="todo-item-label" style={{ textDecoration: 'none', color: 'black' }}>{newText}</label>
                  <button className="destroy" data-testid="todo-item-button"></button>
                </div>
              )}
            </li>
          </ul>
        </main>
        {isInputEntered && (
          <footer className="footer" data-testid="footer">
            <span className="todo-count">1 item left!</span>
            <ul className="filters" data-testid="footer-navigation">
              <li>
                <a
                  className={activeFilter === "all" ? "selected" : ""}
                  href="#/"
                  onClick={() => handleFilterClick("all")}
                >
                  All
                </a>
              </li>
              <li>
                <a
                  className={activeFilter === "active" ? "selected" : ""}
                  href="#active"
                  onClick={() => handleFilterClick("active")}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  className={activeFilter === "completed" ? "selected" : ""}
                  href="#completed"
                  onClick={() => handleFilterClick("completed")}
                >
                  Completed
                </a>
              </li>
            </ul>
            <button className="clear-completed">Clear completed</button>
          </footer>
        )}
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Created by the TodoMVC Team</p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}
