import { KeyboardEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import {
  editTodo,
  removeTodo,
  toggleIsDoneTodo,
} from '../redux/todo/todoSlice';
import { MdClose, MdOutlineCheck } from 'react-icons/md';
import { isMobile } from 'react-device-detect';
import { TodoItem } from '../types/todoItems';

interface TodoListItemProps {
  todo: TodoItem;
}

export const TodoListItem = ({ todo }: TodoListItemProps) => {
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  const handleEditKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (event.key === 'Enter') {
      dispatch(editTodo({ id, title: editingText }));
      setEditingTodoId(null);
    }
  };

  const handleDoubleClick = (id: number, title: string) => {
    setEditingTodoId(id);
    setEditingText(title);
  };

  return (
    <li
      className='group transition-all flex items-center justify-between text-2xl text-slate-600'
      onDoubleClick={() => handleDoubleClick(todo.id, todo.title)}
    >
      <div className='flex items-center justify-center gap-3 '>
        <span
          onClick={() => dispatch(toggleIsDoneTodo(todo.id))}
          className='w-8 h-8 rounded-full border-2 p-1'
        >
          {todo.isDone && <MdOutlineCheck className='text-xl text-green-600' />}
        </span>
        {editingTodoId === todo.id ? (
          <input
            type='text'
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onKeyDown={(e) => handleEditKeyDown(e, todo.id)}
            onBlur={() => {
              dispatch(editTodo({ id: todo.id, title: editingText }));
              setEditingTodoId(null);
            }}
            className='p-1 text-2xl font-thin text-[#747474] outline-none'
            autoFocus
          />
        ) : (
          <p
            className={`p-1 font-normal ${
              todo.isDone ? 'line-through text-slate-400' : 'text-slate-500'
            }`}
          >
            {todo.title}
          </p>
        )}
      </div>
      <button
        onClick={() => dispatch(removeTodo(todo.id))}
        className={`${
          isMobile
            ? 'block'
            : 'opacity-0 transition-opacity duration-100 ease-in-out group-hover:opacity-100'
        } text-red-600 p-1 `}
      >
        <MdClose />
      </button>
    </li>
  );
};
