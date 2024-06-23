import { nanoid } from 'nanoid';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../types/types';
import useFetchTodos from '../hooks/useFetchTodos';

interface TodoContextProps {
    todoList: Task[];
    setTodoList: React.Dispatch<React.SetStateAction<Task[]>>;
    addTask: (title: string) => void;
    removeTask: (id: string) => void;
    updateTaskTitle: (id: string, title: string) => void;
    toggleTaskStatus: (id: string) => void;
    clearCompletedTasks: () => void;
    toggleAllTasks: () => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [todoList, setTodoList] = useState<Task[]>([]);

    const { todoFetch } = useFetchTodos()

    useEffect(() => {
        if (todoFetch) {
        setTodoList(todoFetch);
        }
    }, [todoFetch, setTodoList])

    const addTask = (title: string) => {
        const newTask: Task = { id: nanoid(), title, isDone: false };
        setTodoList(prevList => [...prevList, newTask]);
    };

    const removeTask = (id: string) => {
        setTodoList(prevList => prevList.filter(task => task.id !== id));
    };

    const updateTaskTitle = (id: string, newTitle: string) => {
        const updatedTasks = todoList.map(task =>
            task.id === id ? { ...task, title: newTitle } : task
        );
        setTodoList(updatedTasks);
    };

    const toggleTaskStatus = (id: string) => {
        setTodoList(prevList => 
            prevList.map(task => 
                task.id === id ? { ...task, isDone: !task.isDone } : task
            )
        );
    };

    const clearCompletedTasks = () => {
        setTodoList(prevList => prevList.filter(task => !task.isDone));
    };

    const toggleAllTasks = () => {
        const allCompleted = todoList.every(task => task.isDone);
        setTodoList(prevList => 
            prevList.map(task => ({ ...task, isDone: !allCompleted }))
        );
    };

    return (
    <TodoContext.Provider value={{ todoList, setTodoList, addTask, removeTask, updateTaskTitle, toggleTaskStatus, clearCompletedTasks, toggleAllTasks }}>
        {children}
    </TodoContext.Provider>
    );
};

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};