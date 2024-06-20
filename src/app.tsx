import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import './app.css'; // Assuming you have stylesheets app.css and index.css
import './index.css';
import Footer from "./components/footer";

interface Todo {
  text: string;
  completed: boolean;
}

export default function App() {
  const [todoText, setTodoText] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [numberChange, setNumberChange] = useState<number>(1);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value); // Atualiza o estado com o valor do input
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && todoText.trim() !== '') {
      setTodos([...todos, { text: todoText, completed: false }]);
      setTodoText("");
      setNumberChange(numberChange + 1);
    }
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter); // Update active filter state
  };

  const handleToggle = (index: number) => {
    const newTodos = todos.map((todo, i) => i === index ? { ...todo, completed: !todo.completed } : todo);
    setTodos(newTodos);
  };

  const handleDestroy = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    setNumberChange(numberChange - 1);
  };

  const filteredTodos = todos.filter(todo => {
    if (activeFilter === "active") {
      return !todo.completed;
    } else if (activeFilter === "completed") {
      return todo.completed;
    }
    return true;
  });

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
        {todos.length > 0 && (
          <div className="toggle-all-container">
              <input className="toggle-all" type="checkbox" data-testid="toggle-all" />
              <label className="toggle-all-label" htmlFor="toggle-all">
              </label>
            </div>
          )}
        <ul className="todo-list" data-testid="todo-list">
            {filteredTodos.map((todo, index) => (
              <li key={index} className={todo.completed ? "completed" : ""} data-testid="todo-item">
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    data-testid="todo-item-toggle"
                    checked={todo.completed}
                    onChange={() => handleToggle(index)}
                  />
                  <label data-testid="todo-item-label">
                    {todo.text}
                  </label>
                  <button className="destroy" data-testid="todo-item-button" onClick={() => handleDestroy(index)}></button>
                </div>
              </li>
            ))}
            </ul>
            </main>
            {todos.length > 0 && (
          <footer className="footer" data-testid="footer">
            <span className="todo-count">{numberChange} item{numberChange > 1 ? 's' : ''} left!</span>
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
            <button className="clear-completed" onClick={() => {
              setTodos(todos.filter(todo => !todo.completed));
              setNumberChange(todos.filter(todo => !todo.completed).length);
            }}>
              Clear completed
            </button>
          </footer>
        )}
      </section>
      <Footer />
    </div>
  );
}
