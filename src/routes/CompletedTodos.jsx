import React, { useState, useEffect } from 'react';
import ItemTodo from '../components/ItemTodo';

export default function CompletedTodos({ todos, deleteTodo, updateTodo }) {
  const [completedFilter, setCompletedFilter] = useState([]);

  useEffect(() => {
    const filtered = () => {
      setCompletedFilter(todos.filter(todo => todo.isDone));
    };
    filtered();
  }, [todos]);

  return (
    <div className="w-full bg-white shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {completedFilter.slice(0).reverse().map((todo) => (
          <div className="divide-y divide-gray-200">
            <ItemTodo key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
          </div>
        ))}
      </ul>
    </div>
  );
}
