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
        if (e.key === 'Enter' && newTask.title !== "") {
            addTask()
            setNewTask({ ...newTask, title: "" });
        }
    }
    
    const addTask = () => {
    setTodoList([...todoList, { ...newTask, id: nanoid(5) }]);
    }
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, title: e.target.value });
    }

    const removeTask = (index: number) => {
        console.log('remover task: ' + index)
        setTodoList(todoList.filter((_, idx) => idx !== index))
    }

    const handleTaskStatus = (index: number) => {
        const updatedTasks = [...todoList];
        updatedTasks[index].isDone = !updatedTasks[index].isDone;
        setTodoList(updatedTasks);
    }


    return{
        newTask,
        setNewTask,
        todoList, 
        setTodoList,
        handleKeyDown,
        handleChange,
        removeTask,
        handleTaskStatus
    }

}