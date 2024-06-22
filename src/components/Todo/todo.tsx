import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoProps {}

export default function TodoL(props: TodoProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTodo.trim()) {
      const newTask = { id: Date.now(), title: newTodo, completed: false };
      setTodos([newTask, ...todos]);
      setNewTodo('');
    }
  };

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const handleRemoveTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id: number, newTitle: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, title: newTitle } : todo));
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleToggleAllComplete = () => {
    const allComplete = todos.every(todo => todo.completed);
    setTodos(todos.map(todo => ({ ...todo, completed: !allComplete })));
  };

  return (
    <section>
      <div>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleAddTodo}
        />
        <section>
          <ul>
            {filteredTodos.map(todo => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
                <span>{todo.title}</span>
                <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>{todos.filter(todo => !todo.completed).length} item(s) left</p>
          <button onClick={() => handleFilterChange('all')}>All</button>
          <button onClick={() => handleFilterChange('active')}>Active</button>
          <button onClick={() => handleFilterChange('completed')}>Completed</button>
          <button onClick={handleClearCompleted}>Clear completed</button>
        </section>
      </div>
    </section>
  );
}
