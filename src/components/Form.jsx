import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Todo from '../interfaces/Todo';
import FormProps from '../interfaces/FormProps';

const Form: React.FC<FormProps> = ({ todos, addTodo, finishAllTodos }) => {
  const { register, handleSubmit, reset } = useForm();
  const [id, setId] = useState(todos.length + 1); // Inicia o ID com base na quantidade atual de todos
  const [isInputFocused, setIsInputFocused] = useState(false);

  const onSubmit = (data: { title: string }) => {
    if (data.title.trim() === '') {
      return;
    }

    const todoObj: Todo = { title: data.title, id: id, isDone: false }; // Utiliza o ID atual
    addTodo(todoObj);
    setId(id + 1); // Atualiza o estado do ID para o próximo valor
    reset();
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className={`flex py-4 ${isInputFocused ? 'mb-0.5' : ''} px-1.5 bg-white w-[34.375rem] max-sm:w-[98%] border-b border-solid border-gray-200 ${isInputFocused ? 'shadow-mvc' : ''}`}>
      {todos.length !== 0 ? (
        <button
          name='finishAll'
          className='w-10 text-2xl rotate-90 text-gray-400'
          onClick={() => {
            finishAllTodos();
          }}
        >
          ❯
        </button>
      ) : (
        <span className='w-10'></span>
      )}
      <form onSubmit={handleSubmit(onSubmit)} data-testid="todo-form">
        <input
          type="text"
          id="title"
          placeholder='What needs to be done?'
          className="ml-2 outline-none text-2xl placeholder:text-gray-400 placeholder:italic"
          {...register('title', { required: true })}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </form>
    </div>
  );
};

export default Form;
