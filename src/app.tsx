import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import './app.css';
import './index.css';
import Footer from "./components/footer";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todoText, setTodoText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && todoText.trim() !== '') {
      const newTodo: Todo = {
        id: todos.length + 1,
        text: todoText,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setTodoText("");
    }
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleToggle = (id: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDestroy = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted
    }));
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (activeFilter === "active") {
      return !todo.completed;
    } else if (activeFilter === "completed") {
      return todo.completed;
    }
    return true;
  });

  const numberChange = todos.filter(todo => !todo.completed).length;

  const showToggleAll = todos.length > 0;

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
              placeholder="Quais são as tarefas a serem feitas?"
              value={todoText}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <label className="visually-hidden" htmlFor="todo-input">
            </label>
          </div>
        </header>
        <main className="main" data-testid="main">
          {showToggleAll && (
            <div className="toggle-all-container">
              <input
                className="toggle-all"
                type="checkbox"
                data-testid="toggle-all"
                checked={todos.length > 0 && todos.every(todo => todo.completed)}
                onChange={handleToggleAll}
              />
              <label className="toggle-all-label" htmlFor="toggle-all">
                Toggle all
              </label>
            </div>
          )}
          <ul className="todo-list" data-testid="todo-list">
            {filteredTodos.map(todo => (
              <li key={todo.id} className={todo.completed ? "completed" : ""} data-testid={`todo-item-${todo.id}`}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    data-testid={`todo-item-toggle-${todo.id}`}
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                  />
                  <label
                    data-testid={`todo-item-label-${todo.id}`}
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  >
                    {todo.text}
                  </label>
                  <button className="destroy" data-testid={`todo-item-button-${todo.id}`} onClick={() => handleDestroy(todo.id)}></button>
                </div>
              </li>
            ))}
          </ul>
        </main>
        {todos.length > 0 && (
          <footer className="footer" data-testid="footer">
            <span className="todo-count">{numberChange} item{numberChange !== 1 ? 's' : ''} left!</span>
            <ul className="filters" data-testid="footer-navigation">
              <li>
                <a
                  className={activeFilter === "all" ? "selected" : ""}
                  href="#/"
                  onClick={() => handleFilterClick("all")}
                >
                  Todos
                </a>
              </li>
              <li>
                <a
                  className={activeFilter === "active" ? "selected" : ""}
                  href="#active"
                  onClick={() => handleFilterClick("active")}
                >
                  Ativos
                </a>
              </li>
              <li>
                <a
                  className={activeFilter === "completed" ? "selected" : ""}
                  href="#completed"
                  onClick={() => handleFilterClick("completed")}
                >
                  Completos
                </a>
              </li>
            </ul>
            <button className="clear-completed" onClick={handleClearCompleted}>
              Remover
            </button>
          </footer>
        )}
      </section>
      <Footer />
    </div>
  );
}
