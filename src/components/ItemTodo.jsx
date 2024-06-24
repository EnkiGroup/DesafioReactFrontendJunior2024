import React, { useState } from 'react';

export default function ItemTodo({ todo, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  const handleBlur = () => {
    updateTodo(todo.id, editText, todo.isDone);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <li className={`flex items-center ${isEditing ? 'shadow-mvc mx-0.5 my-[0.12rem]' : ''} py-4 px-1.5 item-todo`}>
      <div className="flex items-center flex-grow">

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            autoFocus
            className="text-left w-full ml-11 outline-none text-2xl placeholder:text-gray-400 text-gray-700"
          />
        ) : (
          <>
            <button
              onClick={() => updateTodo(todo.id, todo.title, !todo.isDone)}
              className={` rounded rounded-full border border-solid ${todo.isDone ? 'border-green-500 p-0.5' : 'border-gray-500 p-3.5'}`}
            >
              {todo.isDone ?
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  name="svgFinish"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`size-6 ${todo.isDone ? 'text-green-500' : 'text-gray-500'}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg> : null}
            </button>
            <label
              htmlFor={`check-${todo.id}`}
              className={`text-left w-full ml-5 block text-2xl leading-5 ${todo.isDone ? 'text-gray-500 line-through' : 'text-gray-700'}`}
              onDoubleClick={handleDoubleClick}
            >
              {todo.title}
            </label>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="mr-3 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out hidden btn-delete"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        )}
      </div>
    </li>
  );
}
