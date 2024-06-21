import { ChangeEvent, useState, KeyboardEvent } from "react";
import { Task } from "../types/types";
import { nanoid } from "nanoid";

export default function useTodoList(initialTodos: Task[]){

    const [newTask, setNewTask] = useState<Task>({
        id: "",
        title: "",
        isDone: false
    })

    const [todoList, setTodoList] = useState<Task[]>(initialTodos || [])

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && newTask.title.trim() !== "") {
            addTask()
            setNewTask({ ...newTask, title: "" });
        }
    }
    
    const addTask = () => {
        setTodoList(prevTodoList => [
            ...prevTodoList,
            { ...newTask, id: nanoid(5) }
        ]);
    };
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, title: e.target.value });
    }

    const removeTask = (id: string) => {
        setTodoList(prevTodoList => prevTodoList.filter(task => task.id !== id));
    }

    const handleTaskStatus = (id: string) => {
        setTodoList(prevTodoList => 
            prevTodoList.map(task => 
                task.id === id ? { ...task, isDone: !task.isDone } : task
            )
        );
    };

    const handleClearAllCompletedTasks = () => {
        setTodoList(prevTodoList => prevTodoList.filter(todo => !todo.isDone));
    }

    const handleSetAllTasksCompleted = () => {
        setTodoList(prevTodoList => {
            const allAreDone = prevTodoList.every(todo => todo.isDone);
            return prevTodoList.map(todo => ({
                ...todo,
                isDone: !allAreDone
            }));
        });
    }

    return{
        newTask,
        setNewTask,
        todoList, 
        setTodoList,
        handleKeyDown,
        handleChange,
        removeTask,
        handleTaskStatus,
        handleClearAllCompletedTasks,
        handleSetAllTasksCompleted
    }

}