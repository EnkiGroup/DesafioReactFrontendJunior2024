import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Filters({ todos, doneCount, clearDoneTodos }) {
  const location = useLocation();

  return (
    <>
      {todos.length !== 0 ? (
        <nav className='relative teste flex py-1 px-4 justify-between items-center w-[34.375rem] max-sm:w-[98%] bg-white border-t border-solid border-gray-200'>
          <p className='text-sm'>{doneCount} items left!</p>
          <div className='flex gap-1'>
            <Link to="/" className={location.pathname === '/' ? 'text-sm border border-solid border-transparent rounded m-1 px-2 py-0.5 no-underline active' : 'text-sm border border-solid border-transparent rounded m-1 px-2 py-0.5 no-underline'}>All</Link>
            <Link to="/active" className={location.pathname === '/active' ? 'text-sm border border-solid border-transparent rounded m-1 px-2 py-0.5 no-underline active' : 'text-sm border border-solid border-transparent rounded m-1 px-2 py-0.5 no-underline'}>Active</Link>
            <Link to="/completed" className={location.pathname === '/completed' ? 'text-sm border border-solid border-transparent rounded m-1 px-2 py-0.5 no-underline active' : 'text-sm border border-solid border-transparent rounded m-1 px-2 py-0.5 no-underline'}>Completed</Link>
          </div>
          <button onClick={clearDoneTodos} className='text-sm hover:underline'>Clear completed</button>
        </nav>
      ) : null }
    </>
  );
}
