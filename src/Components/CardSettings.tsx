import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CardSettingsProps {
    filter: 'all' | 'active' | 'completed';
    setFilter: (filter: 'all' | 'active' | 'completed') => void;
    checkedTasksCount: number;
    clearTasks: () => void;
    tasks: string[];
}
const CardSettings: React.FC<CardSettingsProps> = ({ filter, setFilter, checkedTasksCount, clearTasks, tasks }) => {
    const navigate = useNavigate();
    const itemsLeft = () => {
        const itemsLeftCount = tasks.length - checkedTasksCount;
        if (itemsLeftCount === 0) return '0 items left!'
        return `${itemsLeftCount} item${itemsLeftCount === 1 ? '' : 's'} left!`
    }
    return (
        <>
            <div className='flex flex-row items-center justify-between border border-light-gray-2 h-12 text-sm'>
                <span className='mt-1 mx-2'>
                    {itemsLeft()}
                </span>
                <ul className='flex flex-row mx-2'>
                    <li className={`mt-1 mx-1 cursor-pointer hover:border hover:border-borderColor px-3 py-1 rounded  ${filter === 'all' ? 'border border-borderColor' : ''}`}
                        onClick={() => { navigate('/all'); setFilter('all') }}
                    >
                        All
                    </li>
                    <li className={`mt-1 mx-1 cursor-pointer hover:border hover:border-borderColor px-3 py-1 rounded  ${filter === 'active' ? 'border border-borderColor' : ''}`}
                            onClick={() => { navigate('/active'); setFilter('active') }}
                    >
                        Active
                    </li>
                    <li className={`mt-1 mx-1 cursor-pointer hover:border hover:border-borderColor px-3 py-1 rounded  ${filter === 'completed' ? 'border border-borderColor' : ''}`}
                        onClick={() => { navigate('/completed'); setFilter('completed') }}
                        data-testid='filter-select'
                    >
                        Completed
                    </li>
                </ul>
                <span className='mt-1 mx-2 hover:underline cursor-pointer' onClick={() => { checkedTasksCount ? clearTasks() : ''; navigate('/all') }}>Clear Completed</span>
            </div>
        </>
    )
}

export default CardSettings