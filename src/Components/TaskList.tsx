import React, { useEffect } from 'react'
import { useState } from 'react';
import CardSettings from './CardSettings';
import { useLocation } from 'react-router';

interface TaskListProps {
    tasks: string[];
    setTasks: (tasks: string[]) => void;
    filter: 'all' | 'active' | 'completed';
    setFilter: (filter: 'all' | 'active' | 'completed') => void;
    completedTasks: Record<string, boolean>;
    setCompletedTasks: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, filter, setFilter, completedTasks, setCompletedTasks }) => {
    const [isChecked, setIsChecked] = useState<Record<string, boolean>>({});
    const [isSelected, setIsSelected] = useState<Record<string, boolean>>({});
    const [editTask, setEditTask] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [checkedTasksCount, setCheckedTasksCount] = useState<number>(0);
    
    const location = useLocation();
    useEffect(() => {
        const currentFilter = location.pathname.substring(1);
        if (['all', 'active', 'completed'].includes(currentFilter)) {
            setFilter(currentFilter as 'all' | 'active' | 'completed');
        }
    })

    useEffect(() => {
        const newCheckedTasksCount = Object.values(completedTasks).filter(Boolean).length;
        setCheckedTasksCount(newCheckedTasksCount);
    }, [completedTasks]);
    const clearTasks = () => {
        const newTasks = tasks.filter(task => !completedTasks[task]);
        const newCompletedTasks = Object.keys(completedTasks).reduce((acc, task) => {
            if (!completedTasks[task]) {
                acc[task] = false;
            }
            return acc;
        }, {} as Record<string, boolean>);
        setTasks(newTasks);
        setCompletedTasks(newCompletedTasks);
        const newCheckedTasksCount = Object.values(newCompletedTasks).filter(Boolean).length;
        setCheckedTasksCount(newCheckedTasksCount);
    }
    const handleEdit = (task: string) => {
        console.log('double click')
        setEditTask(task);
        setEditValue(task);
    };
    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(event.target.value);
    };
    const handleEditEnd = () => {
        setTasks(tasks.map(task => task === editTask ? editValue : task))
        setEditTask(null);
        setEditValue('');
    }
    const handleCheck = (task: string) => {
        setCompletedTasks(prevState => {
            const newCompletedTasks = { ...prevState, [task]: !prevState[task] };
            return newCompletedTasks;
        });
    };
    const handleSelect = (task: string) => {
        if (editTask === null) {
            setIsSelected(prevState => ({ ...prevState, [task]: !prevState[task] }))
        }
    }

    const handleDeselect = (task: string) => {
        setIsSelected(prevState => ({ ...prevState, [task]: false }));
    };

    const handleRemove = (event: React.MouseEvent, task: string) => {
        event.stopPropagation();
        const newTasks = tasks.filter(item => item !== task);
        setTasks(newTasks);
        setCompletedTasks(prevState => {
            const { [task]: removed, ...newCompletedTasks } = prevState;
            return newCompletedTasks;
        });
    };
    let filteredTasks = tasks;
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !completedTasks[task]);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => completedTasks[task]);
    }
    // const deleteTask = (taskIndex: number) => {
    //     const task = tasks[taskIndex];
    //     if (completedTasks[task]) {
    //         setCheckedTasksCount(prevCount => prevCount - 1);
    //     }
    //     const newTasks = tasks.filter((_, index) => index !== taskIndex);
    //     setTasks(newTasks);
    //     setCompletedTasks(prevState => {
    //         const { [task]: removed, ...newCompletedTasks } = prevState;
    //         return newCompletedTasks;
    //     });
    // };
    return (
        <>
            {
                filteredTasks.map((task, index) => {
                    return (
                        <div
                            key={index}
                            className='flex flex-row bg-white h-16 items-center md:w-full shadow-md border-t border-light-gray-2'
                            onClick={() => handleSelect(task)}
                            onBlur={() => handleDeselect(task)}
                            onDoubleClick={() => handleEdit(task)}
                            data-testid="task-list"
                        >

                            <div className='flex items-center w-full focus:border focus:border-light-gray-2' onDoubleClick={() => handleEdit(task)}>
                                <div
                                    className='flex items-center ml-3'
                                    onClick={(event) => { event.stopPropagation(); handleCheck(task) }}
                                    data-testid="task-checkbox">
                                    {
                                        completedTasks[task] ?
                                            <ion-icon name="checkmark-circle-outline" style={{ fontSize: '30px', color: 'rgba(0, 128, 0, 0.5)' }}></ion-icon> :
                                            <ion-icon name="ellipse-outline" style={{ fontSize: '30px', color: 'rgba(0, 0, 0, 0.5)' }}></ion-icon>
                                    }
                                </div>
                                <div className={`${completedTasks[task] ? 'line-through text-light-gray' : ''} ml-7 text-2xl text-gray`}>
                                    {
                                        editTask === task ?
                                            <input
                                                value={editValue}
                                                onChange={handleEditChange}
                                                onBlur={handleEditEnd}
                                                onKeyPress={event => event.key === 'Enter' && handleEditEnd()}
                                            /> :
                                            task
                                    }
                                </div>
                            </div>
                            {
                                completedTasks[task] ?
                                    <div className='flex justify-end mr-6' onClick={(event) => handleRemove(event, task)}>
                                        <ion-icon name="close-outline" style={{ fontSize: '25px', color: 'rgba(0, 0, 0, 0.5)' }}></ion-icon>
                                    </div>
                                    : ''
                            };
                        </div>
                    )
                })
            }
            <div className="bg-white w-full">
                {
                    tasks && tasks.length > 0 ?
                        <CardSettings filter={filter} setFilter={setFilter} checkedTasksCount={checkedTasksCount} clearTasks={clearTasks} tasks={tasks} />
                        : ''
                }
            </div>
        </>
    );
}


export default TaskList