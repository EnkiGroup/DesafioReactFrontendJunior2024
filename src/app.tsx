import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import {
  MdKeyboardArrowDown,
  MdOutlineCheck,
  MdClose,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { KeyboardEvent, useState } from 'react';
import {
  addTodo,
  toggleIsDoneTodo,
  removeTodo,
  toggleAllTodos,
  clearAllTodos,
  editTodo,
} from './redux/todo/todoSlice';
import { isMobile } from 'react-device-detect';

export default function App() {
  const [newTodo, setNewTodo] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'active' | 'completed'
  >('all');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  const todosList = useSelector((state: RootState) => state.todoList.todo);
  const todosActive = useSelector(
    (state: RootState) => state.todoList.activeTodo
  );
  const todosCompleted = useSelector(
    (state: RootState) => state.todoList.completedTodo
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitTodo = () => {
    if (newTodo.trim() === '' || newTodo === '') {
      setNewTodo('');
      return;
    }
    dispatch(addTodo(newTodo));
    setNewTodo('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmitTodo();
    }
  };

  const filteredTodos = () => {
    switch (activeFilter) {
      case 'active':
        return todosActive;
      case 'completed':
        return todosCompleted;
      default:
        return todosList;
    }
  };

  const handleEditKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (event.key === 'Enter') {
      dispatch(editTodo({ id, text: editingText }));
      setEditingTodoId(null);
    }
  };

  const handleDoubleClick = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditingText(text);
  };

  return (
    <main className='bg-[#f5f5f5] min-h-screen py-20'>
      <section className='container m-auto px-5 max-w-[600px]'>
        <h1 className='text-5xl text-[#b83f45] text-center mb-4'>todos</h1>
        <div className='flex bg-white items-center gap-3 p-3 border-b-2'>
          <button onClick={() => dispatch(toggleAllTodos())}>
            <MdKeyboardArrowDown className='text-2xl text-[#747474] w-8' />
          </button>
          <input
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
            type='text'
            placeholder='What needs to be done?'
            className='italic text-2xl font-thin w-full text-[#747474] p-1 outline-none'
            onKeyDown={handleKeyDown}
          />
          {isMobile && (
            <button onClick={handleSubmitTodo}>
              <MdKeyboardArrowRight className='text-2xl text-[#747474] w-8' />
            </button>
          )}
        </div>
        {todosList.length > 0 && (
          <>
            {filteredTodos().length > 0 && (
              <div className='bg-white p-3 border-b-2'>
                <ul className='flex flex-col gap-3'>
                  {filteredTodos().map((todo) => (
                    <li
                      key={todo.id}
                      className='group transition-all flex items-center justify-between text-2xl text-slate-600'
                      onDoubleClick={() =>
                        handleDoubleClick(todo.id, todo.text)
                      }
                    >
                      <div className='flex items-center justify-center gap-3 '>
                        <span
                          onClick={() => dispatch(toggleIsDoneTodo(todo.id))}
                          className='w-8 h-8 rounded-full border-2 p-1'
                        >
                          {todo.isDone && (
                            <MdOutlineCheck className='text-xl text-green-600' />
                          )}
                        </span>
                        {editingTodoId === todo.id ? (
                          <input
                            type='text'
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyDown={(e) => handleEditKeyDown(e, todo.id)}
                            onBlur={() => {
                              dispatch(
                                editTodo({ id: todo.id, text: editingText })
                              );
                              setEditingTodoId(null);
                            }}
                            className='p-1 text-2xl font-thin text-[#747474] outline-none'
                            autoFocus
                          />
                        ) : (
                          <p
                            className={`p-1 font-normal ${
                              todo.isDone
                                ? 'line-through text-slate-400'
                                : 'text-slate-500'
                            }`}
                          >
                            {todo.text}
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
                  ))}
                </ul>
              </div>
            )}
            <div className='bg-white p-3 flex flex-col gap-3 lg:flex-row items-center justify-between text-slate-600'>
              <p>{todosActive.length} items left</p>
              <div className='flex gap-4'>
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`${
                    activeFilter === 'all'
                      ? 'border'
                      : 'border border-transparent'
                  }  hover:border-slate-300 rounded-md px-2`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter('active')}
                  className={`${
                    activeFilter === 'active'
                      ? 'border'
                      : 'border border-transparent'
                  }  hover:border-slate-300 rounded-md px-2`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveFilter('completed')}
                  className={`${
                    activeFilter === 'completed'
                      ? 'border'
                      : 'border border-transparent'
                  }  hover:border-slate-300 rounded-md px-2`}
                >
                  Completed
                </button>
              </div>
              <button onClick={() => dispatch(clearAllTodos())}>
                Clear Completed
              </button>
            </div>
          </>
        )}
        <div className='mt-5'>
          <p className='text-slate-500 text-center'>
            Double click on todo to edit
          </p>
        </div>
      </section>
    </main>
  );
}
