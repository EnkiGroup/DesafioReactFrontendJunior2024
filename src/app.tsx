import { useState, useEffect } from "react";
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import "./styles/main.scss";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import TodoFooter from "./components/TodoFooter";
import Footer from "./components/Footer";

// Interface que define a estrutura de cada tarefa (Todo)
export interface Todo {
  id: string;
  title: string;
  isDone: boolean;
  editing: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoNew, setTodoNew] = useState<string>("");

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoNew(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && todoNew.trim() !== '') {
      const newTodo: Todo = {
        id: uuidv4(),
        title: todoNew.trim(),
        isDone: false,
        editing: false
      };
      setTodos([newTodo, ...todos]);
      setTodoNew("");
    }
  };

  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.isDone);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      isDone: !allCompleted
    }));
    setTodos(updatedTodos);
  };

  const handleSaveEdit = (id: string, newTitle: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitle, editing: false };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.isDone));
  };

  const FilteredTodoList = () => {
    const location = useLocation();
    let filteredTodos = todos;
    if (location.pathname === '/active') {
      filteredTodos = todos.filter(todo => !todo.isDone);
    } else if (location.pathname === '/completed') {
      filteredTodos = todos.filter(todo => todo.isDone);
    }

    return (
      <TodoList
        todos={filteredTodos}
        setTodos={setTodos}
        handleSaveEdit={handleSaveEdit}
      />
    );
  };

  const numberChange = todos.filter(todo => !todo.isDone).length;

  return (
    <div>
      <section id="root" className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoInput
            value={todoNew}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </header>

        <main className="main">
          {todos.length > 0 && (
            <div className="toggle-all-container">
              <input
                aria-label="Concluir todas as tarefas"
                className="toggle-all"
                type="checkbox"
                checked={todos.every(todo => todo.isDone)}
                onChange={handleToggleAll}
              />
              <label className="toggle-all-label" htmlFor="toggle-all">
                Toggle all
              </label>
            </div>
          )}
          <Routes>
            <Route path="/" element={<FilteredTodoList />} />
            <Route path="/active" element={<FilteredTodoList />} />
            <Route path="/completed" element={<FilteredTodoList />} />
          </Routes>
        </main>

        {todos.length > 0 && (
          <TodoFooter
            numberChange={numberChange}
            handleClearCompleted={handleClearCompleted}
          />
        )}
      </section>

      <Footer />
    </div>
  );
};

export default App;