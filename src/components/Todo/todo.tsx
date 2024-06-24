import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './todo.css';
import { ChevronDown, X } from 'lucide-react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoProps {
  filter: string;
}

const Todo: React.FC<TodoProps> = ({ filter }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editTitle, setEditTitle] = useState<string>('');
  const [editId, setEditId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [allCompleted, setAllCompleted] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTodo.trim()) {
      const newTask = { id: Date.now().toString(), title: newTodo, completed: false };
      setTodos([newTask, ...todos]);
      setNewTodo('');
    }
  };

  const handleToggleComplete = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const handleRemoveTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id: string, title: string) => {
    if (title.trim()) {
      const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, title: title } : todo);
      setTodos(updatedTodos);
    }
    setEditId(null);
  };

  const handleDoubleClick = (id: string, title: string) => {
    setEditId(id);
    setEditTitle(title);
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleMarkAll = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted
    }));
    setTodos(updatedTodos);
    setAllCompleted(!allCompleted);
  };

  const itemsLeft = todos.reduce((acc, todo) => !todo.completed ? acc + 1 : acc, 0);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <section className='todo-container'>
      {todos.length > 0 && (
        <>
          <div className='background-card'></div>
          <div className='background-card'></div>
          <div className='background-card'></div>
        </>
      )}
      <div className='todo-header'>
        {todos.length > 0 &&(
          <>
            <button onClick={handleMarkAll}>
              <ChevronDown />
            </button>
          </>
        )}
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleAddTodo}
        />
      </div>
      {todos.length > 0 && (
        <>
          <section className='todo-list'>
            <ul>
              {filteredTodos.map(todo => (
                <li key={todo.id}>
                  {editId === todo.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onBlur={() => handleEditTodo(todo.id, editTitle)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleEditTodo(todo.id, editTitle);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(todo.id)}
                      />
                      <span onDoubleClick={() => handleDoubleClick(todo.id, todo.title)}>
                        {todo.title}
                      </span>
                      <button onClick={() => handleRemoveTodo(todo.id)}> <X /> </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
          <div className='todo-menu'>
            <span>{itemsLeft} item(s) left</span>
            <div className='filter-links'>
              <Link to="/" className={activeFilter === 'all' ? 'active' : ''} onClick={() => handleFilterChange('all')}>All</Link>
              <Link to="/active" className={activeFilter === 'active' ? 'active' : ''} onClick={() => handleFilterChange('active')}>Active</Link>
              <Link to="/completed" className={activeFilter === 'completed' ? 'active' : ''} onClick={() => handleFilterChange('completed')}>Completed</Link>
            </div>
            <button onClick={handleClearCompleted}>
              Clear completed
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Todo;