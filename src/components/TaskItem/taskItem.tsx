import { useEffect, useRef, useState, KeyboardEvent, ChangeEvent } from "react";
import { Task } from "../../types/types";

type TaskItemProps = {
    task: Task;
    index: number;
    handleTaskStatus: (id: string) => void;
    removeTask: (id: string) => void;
    updateTaskTitle: (id: string, newTitle: string) => void
}

export default function TaskItem({ task, index, handleTaskStatus, removeTask, updateTaskTitle }: TaskItemProps){

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(task.title); 
    const editRef = useRef<HTMLDivElement>(null); 
    const inputRef = useRef<HTMLInputElement>(null);


    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateTaskTitle(task.id, newTitle);
            setIsEditing(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (editRef.current && !editRef.current.contains(event.target as Node)) {
                setIsEditing(false);
                setNewTitle(task.title); 
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [task.title]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    return (
        
        <li className={`item_container ${isEditing? 'focus_item' : ''}`}>
            {
                isEditing? 
                <div className="editing_container" ref={editRef}> 
                    <input 
                        ref={inputRef}
                        type="text" 
                        name="editing_input" 
                        className="editing_input" 
                        placeholder="Insira um novo título" 
                        onChange={handleChange}  
                        onKeyDown={handleKeyDown} 
                    /> 
                </div> : 
                (
                    <>
                        <input
                            type="checkbox"
                            name="item_status"
                            id={`item_status_${index}`}
                            className="item_status"
                            checked={task.isDone}
                            onChange={() => handleTaskStatus(task.id)}
                        />
                        <label htmlFor={`item_status_${index}`} className="custom-checkbox-label"></label>
                        {}
                        <div className={`item_title ${task.isDone? 'title_style_done' : ''}`} onDoubleClick={() => {
                            setIsEditing(!isEditing)
                        }}>
                            {task.title}
                        </div>
                        <button className="remove_task_button" onClick={() => removeTask(task.id)}>×</button>
                    </>
                )
            }
        </li>
    );
}