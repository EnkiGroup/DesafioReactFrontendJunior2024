import { useState, useEffect } from "react";
import './styles/main.scss';
import Footer from "./components/Footer";

interface Todo {
  id: string;
  title: string;
  isDone: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section id="root" className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <div className="input-container">
            <input
              className="new-todo"
              type="text"
              placeholder="What needs to be done?"
            />
            <label className="visually-hidden" htmlFor="todo-input">
            </label>
          </div>
        </header>
        <main className="main">
          <div className="toggle-all-container">
            <input
              className="toggle-all"
              type="checkbox"
            />
            <label className="toggle-all-label" htmlFor="toggle-all">
              Toggle all
            </label>
          </div>

          {/* <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                {todo.title} - {todo.isDone ? 'Completed' : 'Not Completed'}
              </li>
            ))}
          </ul> */}
        </main>
      </section>
      <Footer />
    </div>
  );
}

export default App;