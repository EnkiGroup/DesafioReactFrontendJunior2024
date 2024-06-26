import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import { KeyboardEvent, useEffect, useState } from 'react';

import { isMobile } from 'react-device-detect';
import { AppDispatch, RootState } from '../redux/store';
import {
  addTodo,
  clearAllTodos,
  fetchTodoData,
  toggleAllTodos,
} from '../redux/todo/todoSlice';
import { TodoListItem } from '../components/todoListItem';
import { ButtonFooter } from '../components/buttonFooter';
import { Input } from '../components/input';

export const Home = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'active' | 'completed'
  >('all');

  const todosList = useSelector((state: RootState) => state.todoList.todo);
  const todosActive = useSelector(
    (state: RootState) => state.todoList.activeTodo
  );
  const todosCompleted = useSelector(
    (state: RootState) => state.todoList.completedTodo
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodoData());
  }, [dispatch]);

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

  return (
    <main className='bg-[#f5f5f5] min-h-screen py-20'>
      <section className='container m-auto px-5 max-w-[600px]'>
        <h1 className='text-5xl text-[#b83f45] text-center mb-4'>todos</h1>
        <div className='shadow-[0px_30px_0px_20px_#ededed] rounded-t-3xl rounded-b-3xl'>
          <div className='flex bg-white items-center gap-3 p-3 border-b-2'>
            <button onClick={() => dispatch(toggleAllTodos())}>
              <MdKeyboardArrowDown className='text-2xl text-[#747474] w-8' />
            </button>
            <Input
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
              type='text'
              placeholder='What needs to be done?'
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
                      <TodoListItem key={todo.id} todo={todo} />
                    ))}
                  </ul>
                </div>
              )}
              <footer className='bg-white p-3 flex flex-col gap-3 lg:flex-row items-center justify-between text-slate-600 footer'>
                <p>{todosActive.length} items left</p>
                <div className='flex gap-4'>
                  <ButtonFooter
                    activeFilter={activeFilter}
                    onClick={() => setActiveFilter('all')}
                    nameItem='all'
                  >
                    All
                  </ButtonFooter>
                  <ButtonFooter
                    activeFilter={activeFilter}
                    onClick={() => setActiveFilter('active')}
                    nameItem='active'
                  >
                    Active
                  </ButtonFooter>
                  <ButtonFooter
                    activeFilter={activeFilter}
                    onClick={() => setActiveFilter('completed')}
                    nameItem='completed'
                  >
                    Completed
                  </ButtonFooter>
                </div>
                <button onClick={() => dispatch(clearAllTodos())}>
                  Clear Completed
                </button>
              </footer>
            </>
          )}
        </div>
        <div className='mt-20'>
          <p className='text-slate-500 text-center'>
            Double click on todo to edit
          </p>
        </div>
      </section>
    </main>
  );
};
