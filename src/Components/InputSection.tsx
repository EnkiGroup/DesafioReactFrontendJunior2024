import { useState, useEffect } from "react"
import React from 'react'
import TaskList from "./TaskList";

function InputSection() {
    const [inputValue, setInputValue] = React.useState('' as string);
    const [task, setTask] = React.useState([] as string[]);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
    const [allChecked, setAllChecked] = useState<boolean>(false);

    React.useEffect(() => {
    }, [task]);


    const createTask = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue) return;
        setTask([...task, inputValue])
        setInputValue('')
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    };
    // interface TaskListProps {
    //     tasks: string[];
    //     setTasks: (tasks: string[]) => void;
    //     completedTasks: Record<string, boolean>;
    //     setCompletedTasks: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    // }

    useEffect(() => {
        if (allChecked) {
            const allTasks = task.reduce((acc, task) => {
                acc[task] = true;
                return acc;
            }, {} as Record<string, boolean>);
            setCompletedTasks(allTasks);
            setAllChecked(false);
        }
    }, [allChecked, task]);
    const checkAllTasks = () => {
        setAllChecked(true);
    }
    return (
        <>
            <div className={`bg-white items-center md:w-3/5 shadow-sm focus:within focus:border focus:border-light-gray-2 focus:outline-1 focus:outline-offset-2 focus:outline-focusInput`} tabIndex={0}>
                <form onSubmit={createTask} className={`${inputValue ? 'border-2 border-focusInput outline-2' : ''} `}>
                    <div className="flex items-center w-text-gray">
                        {task && task.length > 0 ? (
                            <label className="ml-3 align-middle w-10 items-center" onClick={checkAllTasks}>
                                <ion-icon name="chevron-down-outline"></ion-icon>
                            </label>
                        ) : ''}
                        <input
                            type="text"
                            className={`group-focus/item:visible text-xl font-thin italic bg-white p-5 w-full outline-none`}
                            placeholder="What needs to be done?"
                            value={inputValue}
                            onChange={handleInputChange} />
                    </div>
                </form >
                <div className="md:w-full shadow-md">
                    {
                        task && task.length > 0 ?
                            <TaskList tasks={task} setTasks={setTask} filter={filter} setFilter={setFilter} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} /> :
                            ''
                    }
                </div>

            </div>
            <footer className="flex flex-col items-center text-gray text-xs">
                <p className="mt-20">Double-click to edit a todo</p>
                <p className="mt-2">Created by the TodoMVC Team</p>
                <p className="mt-2">Part of TodoMVC</p>
            </footer>
        </>
    )
}

export default InputSection