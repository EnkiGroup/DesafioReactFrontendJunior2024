import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import "./styles/main.scss";
import Footer from "./components/Footer";
import { v4 as uuidv4 } from "uuid";

// Interface que define a estrutura de cada tarefa (Todo)
interface Todo {
  id: string;
  title: string;
  isDone: boolean;
  editing: boolean;
}

const App = () => {
  // Estado para armazenar a lista de tarefas
  const [todos, setTodos] = useState<Todo[]>([]);
  // Estado para armazenar o valor do input de nova tarefa
  const [todoNew, setTodoNew] = useState<string>("");

  // useEffect para buscar as tarefas iniciais da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTodos(data); // Atualiza o estado com as tarefas recebidas
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      }
    };

    fetchData();
  }, []);

  // Manipulador para atualização do valor do input
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoNew(event.target.value);
  };

  // Manipulador para adicionar nova tarefa ao pressionar Enter
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && todoNew.trim() !== '') {
      const newTodo: Todo = {
        id: uuidv4(), // Gera um id único para a nova tarefa
        title: todoNew.trim(),
        isDone: false,
        editing: false
      };
      setTodos([newTodo, ...todos]); // Adiciona a nova tarefa à lista de tarefas
      setTodoNew(""); // Limpa o input
    }
  };

  // Manipulador para marcar/desmarcar todas as tarefas como concluídas
  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.isDone);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      isDone: !allCompleted
    }));
    setTodos(updatedTodos);
  };

  // Manipulador para salvar a edição de uma tarefa
  const handleSaveEdit = (id: string, newTitle: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitle, editing: false };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Número de tarefas não concluídas
  const numberChange = todos.filter(todo => !todo.isDone).length;

  // Manipulador para limpar todas as tarefas concluídas
  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.isDone));
  };

  // Componente para renderizar a lista de tarefas filtradas
  const FilteredTodoList = () => {
    const location = useLocation();
    let filteredTodos = todos;
    if (location.pathname === '/active') {
      filteredTodos = todos.filter(todo => !todo.isDone);
    } else if (location.pathname === '/completed') {
      filteredTodos = todos.filter(todo => todo.isDone);
    }

    return (
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            handleSaveEdit={handleSaveEdit}
          />
        ))}
      </ul>
    );
  };

  return (
    <div>
      <section id="root" className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <div className="input-container">
            <input
              id="todo-input"
              className="new-todo"
              type="text"
              placeholder="What needs to be done?"
              value={todoNew}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <label className="visually-hidden" htmlFor="todo-input"></label>
          </div>
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
          <footer className="footer" data-testid="footer">
            <span className="todo-count">{numberChange} item{numberChange !== 1 ? 's' : ''} left!</span>
            <ul className="filters" data-testid="footer-navigation">
              <li>
                <NavLink className={({ isActive }) => isActive ? "selected" : ""} to="/">
                  All
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? "selected" : ""} to="/active">
                  Active
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? "selected" : ""} to="/completed">
                  Completed
                </NavLink>
              </li>
            </ul>
            <button className="clear-button" onClick={handleClearCompleted}>
              Clear completed
            </button>
          </footer>
        )}
      </section>

      <Footer />
    </div>
  );
};

// Props para o componente TodoItem
interface TodoItemProps {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleSaveEdit: (id: string, newTitle: string) => void;
}

// Componente para renderizar cada tarefa individual
const TodoItem: React.FC<TodoItemProps> = ({ todo, todos, setTodos, handleSaveEdit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todo.editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [todo.editing]);

  return (
    <li className={`${todo.isDone ? "completed" : ""} ${todo.editing ? "editing" : ""}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.isDone}
          onChange={() => {
            setTodos(todos.map(t => t.id === todo.id ? { ...t, isDone: !t.isDone } : t));
          }}
        />
        <label onDoubleClick={() => {
          setTodos(todos.map(t => t.id === todo.id ? { ...t, editing: true } : t));
        }}>
          {todo.title}
        </label>
        <button className="delete" onClick={() => {
          setTodos(todos.filter(t => t.id !== todo.id));
        }}></button>
      </div>
      {todo.editing && (
        <input
          ref={inputRef}
          type="text"
          className="edit"
          value={todo.title}
          onChange={(e) => setTodos(todos.map(t => t.id === todo.id ? { ...t, title: e.target.value } : t))}
          onBlur={() => handleSaveEdit(todo.id, todo.title)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSaveEdit(todo.id, todo.title);
            } else if (e.key === 'Escape') {
              setTodos(todos.map(t => t.id === todo.id ? { ...t, editing: false } : t));
            }
          }}
        />
      )}
    </li>
  );
};

export default App;