<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import './App.css'; // Importe o arquivo CSS para estilização

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [editMode, setEditMode] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState<string>('');
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos')
            .then(response => response.json())
            .then(data => setTodos(data));
    }, []);

    const addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTodo.trim()) {
            const newTodoItem: Todo = {
                id: Date.now(),
                title: newTodo.trim(),
                completed: false,
            };
            setTodos([newTodoItem, ...todos]);
            setNewTodo('');
        }
    };

    const toggleTodo = (id: number) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const removeTodo = (id: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    const editTodo = (id: number, newTitle: string) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, title: newTitle } : todo
        );
        setTodos(updatedTodos);
    };

    const clearCompleted = () => {
        const updatedTodos = todos.filter(todo => !todo.completed);
        setTodos(updatedTodos);
    };

    const toggleAllTodos = () => {
        const areAllCompleted = todos.every(todo => todo.completed);
        const updatedTodos = todos.map(todo => ({
            ...todo,
            completed: !areAllCompleted
        }));
        setTodos(updatedTodos);
    };

    const remainingCount = todos.filter(todo => !todo.completed).length;

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true; // 'all'
    });

    return (
        <div className="todo-app">
            <h1>Todo List</h1>
            <div className="input-wrapper">
                <button onClick={toggleAllTodos} className="toggle-all">
                    <i className="arrow"></i>
                </button>
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={addTodo}
                    tabIndex={0}
                />
            </div>
            {filteredTodos.length > 0 ? (
                <ul>
                    {filteredTodos.map(todo => (
                        <li 
                            key={todo.id} 
                            onDoubleClick={() => {
                                setEditMode(todo.id);
                                setEditedTitle(todo.title);
                            }} 
                            className={editMode === todo.id ? 'editing' : ''}
                        >
                            {editMode === todo.id ? (
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    onBlur={() => {
                                        editTodo(todo.id, editedTitle);
                                        setEditMode(null);
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            editTodo(todo.id, editedTitle);
                                            setEditMode(null);
                                        }
                                    }}
                                    tabIndex={0}
                                />
                            ) : (
                                <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
                            )}
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                tabIndex={0}
                            />
                            <button onClick={() => removeTodo(todo.id)} tabIndex={0}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tasks to show</p>
            )}
            <footer>
                <span>{remainingCount} items left</span>
                <button onClick={clearCompleted} tabIndex={0}>Clear completed</button>
                <div>
                    <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''} tabIndex={0}>All</button>
                    <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''} tabIndex={0}>Active</button>
                    <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''} tabIndex={0}>Completed</button>
                </div>
            </footer>
        </div>
    );
};

export default App;
=======
import React from "react";

export default function App() {
  return (
    <section>
      <h1>Todos</h1>
    </section>
  );
}
>>>>>>> 8df937a1d3eef72fb55df424a29ba083ffe604df
