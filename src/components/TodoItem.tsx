import React from 'react';

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleTodo, onDeleteTodo }) => (
  <li className={todo.completed ? 'completed' : ''}>
    <div className="view">
      <input 
        className="toggle" 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => onToggleTodo(todo.id)} 
      />
      <label>{todo.text}</label>
      <button className="destroy" onClick={() => onDeleteTodo(todo.id)}></button>
    </div>
  </li>
);

export default TodoItem;
