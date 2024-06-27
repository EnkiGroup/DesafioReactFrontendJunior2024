import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './app.css';

interface Task {
    id: number;
    title: string;
    completed: boolean;
    editing?: boolean; // Adicionando a propriedade opcional editing
}

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [allCompleted, setAllCompleted] = useState(false);

    const fetchTasks = useCallback(() => {
        axios.get('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos')
            .then(response => {
                const fetchedTasks: Task[] = response.data.map((task: any) => ({
                    id: task.id,
                    title: task.title,
                    completed: task.isDone
                }));
                setTasks(fetchedTasks);
            });
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const addTask = useCallback((title: string) => {
        const newTask = {
            id: tasks.length + 1,
            title,
            completed: false
        };
        setTasks([newTask, ...tasks]);
    }, [tasks]);

    const removeTask = useCallback((id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    }, [tasks]);

    const toggleTask = useCallback((id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    }, [tasks]);

    const handleToggleAll = useCallback(() => {
        const updatedTasks = tasks.map(task => ({
            ...task,
            completed: !allCompleted
        }));
        setTasks(updatedTasks);
        setAllCompleted(!allCompleted);
    }, [tasks, allCompleted]);

    const handleDoubleClick = useCallback((id: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, editing: true } : task
        );
        setTasks(updatedTasks);
    }, [tasks]);

    const handleBlur = useCallback((id: number, newText: string) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, title: newText, editing: false };
            }
            return task;
        });
        setTasks(updatedTasks);
    }, [tasks]);

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return false;
    });

    const remainingTasks = tasks.filter(task => !task.completed).length;

    return (
        <div className="todoapp">
            <header>
                <h1>todos</h1>
                <input
                    className="new-todo"
                    type="text"
                    placeholder="What needs to be done?"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            addTask(newTask);
                            setNewTask('');
                        }
                    }}
                />
            </header>
            <section className="main">
                <input
                    className="toggle-all"
                    type="checkbox"
                    id="toggle-all"
                    checked={allCompleted}
                    onChange={handleToggleAll}
                />
                <label
                    className="toggle-all-label"
                    htmlFor="toggle-all"
                />
                <ul className="todo-list">
                    {filteredTasks.map(task => (
                        <li key={task.id} className={task.completed ? 'completed' : ''}>
                            <div className="view">
                                <input
                                    className="toggle"
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                />
                                {task.editing ? (
                                    <input 
                                        type="text"
                                        value={task.title}
                                        autoFocus
                                        onBlur={(e) => handleBlur(task.id, (e.target as HTMLInputElement).value)}
                                        onChange={(e) =>
                                            setTasks(
                                                tasks.map((t) =>
                                                    t.id === task.id ? { ...t, title: e.target.value } : t
                                                )
                                            )
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleBlur(task.id, (e.target as HTMLInputElement).value);
                                            }
                                        }}
                                    />
                                ) : (
                                    <label
                                        onDoubleClick={() => handleDoubleClick(task.id)}
                                        className={`label ${task.editing ? 'editing' : ''}`}
                                    >
                                        {task.title}
                                    </label>
                                )}
                                <button
                                    className="destroy"
                                    onClick={() => removeTask(task.id)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <footer className="footer">
                <span className="todo-count">
                    <strong>{remainingTasks}</strong> item{remainingTasks !== 1 ? 's' : ''} left
                </span>
                <ul className="filters">
                    <li>
                        <a
                            href="#/"
                            className={filter === 'all' ? 'selected' : ''}
                            onClick={() => setFilter('all')}
                        >All</a>
                    </li>
                    <li>
                        <a
                            href="#/active"
                            className={filter === 'active' ? 'selected' : ''}
                            onClick={() => setFilter('active')}
                        >Active</a>
                    </li>
                    <li>
                        <a
                            href="#/completed"
                            className={filter === 'completed' ? 'selected' : ''}
                            onClick={() => setFilter('completed')}
                        >Completed</a>
                    </li>
                </ul>
                <button
                    className="clear-completed"
                    onClick={() => setTasks(tasks.filter(task => !task.completed))}
                >
                    Clear completed
                </button>
            </footer>
        </div>
    );
};

export default App;
