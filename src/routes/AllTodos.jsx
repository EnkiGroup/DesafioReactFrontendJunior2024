import React from 'react';
import ItemTodo from '../components/ItemTodo';

export default function All({todos, deleteTodo, updateTodo}) {
  return (
    <>
      <div className="w-full bg-white shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {todos.slice(0).reverse().map((todo) => (
          <ItemTodo key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        ))}
      </ul>
    </div>
    </>
  );
}
