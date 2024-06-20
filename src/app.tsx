import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import './app.css';
import './index.css';
import Footer from "./components/footer";
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  title: string;
  isDone: boolean;
}

const FILTER_ALL = 'all';
const FILTER_ACTIVE = 'active';
const FILTER_COMPLETED = 'completed';

export default function App() {
  const [todoText, setTodoText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>(FILTER_ALL);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos');
        setTodos(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && todoText.trim() !== '') {
      const newTodo: Todo = {
        id: uuidv4(),
        title: todoText,
        isDone: false
      };
      setTodos([...todos, newTodo]);
      setTodoText("");
    }
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleToggle = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDestroy = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.isDone));
  };

  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.isDone);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      isDone: !allCompleted
    }));
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (activeFilter === FILTER_ACTIVE) {
      return !todo.isDone;
    } else if (activeFilter === FILTER_COMPLETED) {
      return todo.isDone;
    }
    return true;
  });

  const numberChange = todos.filter(todo => !todo.isDone).length;

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
                checked={todos.length > 0 && todos.every(todo => todo.isDone)}
                onChange={handleToggleAll}
              />
              <label className="toggle-all-label" htmlFor="toggle-all">
                Toggle all
              </label>
            </div>
          )}
          <ul className="todo-list" data-testid="todo-list">
            {filteredTodos.map(todo => (
              <li key={todo.id} className={todo.isDone ? "completed" : ""} data-testid={`todo-item-${todo.id}`}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    data-testid={`todo-item-toggle-${todo.id}`}
                    checked={todo.isDone}
                    onChange={() => handleToggle(todo.id)}
                  />
                  <label
                    data-testid={`todo-item-label-${todo.id}`}
                    style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}
                  >
                    {todo.title}
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
                  className={activeFilter === FILTER_ALL ? "selected" : ""}
                  href="#/"
                  onClick={() => handleFilterClick(FILTER_ALL)}
                >
                  Todos
                </a>
              </li>
              <li>
                <a
                  className={activeFilter === FILTER_ACTIVE ? "selected" : ""}
                  href="#active"
                  onClick={() => handleFilterClick(FILTER_ACTIVE)}
                >
                  Ativos
                </a>
              </li>
              <li>
                <a
                  className={activeFilter === FILTER_COMPLETED ? "selected" : ""}
                  href="#completed"
                  onClick={() => handleFilterClick(FILTER_COMPLETED)}
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
