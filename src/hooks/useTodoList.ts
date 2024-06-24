import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useTodoContext } from "../context/todoContext";

export default function useTodoList(){

    const { addTask } = useTodoContext();

    const [newTask, setNewTask] = useState<string>("")

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && newTask.trim() !== "") {
            addTask(newTask.trim());
            setNewTask("");  
        }
    }
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);
    }

    return{
        newTask,
        setNewTask,
        handleKeyDown,
        handleChange
    }

}