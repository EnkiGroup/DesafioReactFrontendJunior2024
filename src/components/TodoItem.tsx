import React, { useRef, useEffect } from 'react';
import { Todo } from '../app';

interface TodoItemProps {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleSaveEdit: (id: string, newTitle: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, todos, setTodos, handleSaveEdit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todo.editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [todo.editing]);

  return (
    <li className={`${todo.isDone ? "completed" : ""} ${todo.editing ? "editing" : ""}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.isDone}
          onChange={() => {
            setTodos(todos.map(t => t.id === todo.id ? { ...t, isDone: !t.isDone } : t));
          }}
        />
        <label onDoubleClick={() => {
          setTodos(todos.map(t => t.id === todo.id ? { ...t, editing: true } : t));
        }}>
          {todo.title}
        </label>
        <button className="delete" onClick={() => {
          setTodos(todos.filter(t => t.id !== todo.id));
        }}></button>
      </div>
      {todo.editing && (
        <input
          ref={inputRef}
          type="text"
          className="edit"
          value={todo.title}
          onChange={(e) => setTodos(todos.map(t => t.id === todo.id ? { ...t, title: e.target.value } : t))}
          onBlur={() => handleSaveEdit(todo.id, todo.title)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSaveEdit(todo.id, todo.title);
            } else if (e.key === 'Escape') {
              setTodos(todos.map(t => t.id === todo.id ? { ...t, editing: false } : t));
            }
          }}
        />
      )}
    </li>
  );
};

export default TodoItem;