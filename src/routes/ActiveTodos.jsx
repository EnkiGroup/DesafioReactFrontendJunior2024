import React, { useState, useEffect } from 'react';
import ItemTodo from '../components/ItemTodo';

export default function ActiveTodos({ todos, deleteTodo, updateTodo }) {
  const [activeFilter, setActiveFilter] = useState([]);

  useEffect(() => {
    const filtered = () => {
      setActiveFilter(todos.filter(todo => !todo.isDone));
    };
    filtered();
  }, [todos]);

  return (
    <div className="w-full bg-white shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {activeFilter.slice(0).reverse().map((todo) => (
          <ItemTodo key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        ))}
      </ul>
    </div>
  );
}
