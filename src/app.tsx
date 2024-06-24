import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllTodos from './routes/AllTodos';
import ActiveTodos from './routes/ActiveTodos';
import CompletedTodos from './routes/CompletedTodos';
import Form from './components/Form';
import Filters from './components/Filters';
import Todo from './interfaces/Todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id: number) => {
    const filtered = todos.filter((todo) => todo.id !== id);
    setTodos(filtered);
  };

  const updateTodo = (id: number, newTitle: string, isDone: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newTitle, isDone };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const finishAllTodos = () => {
    const newStatus = !allDone;
    const updatedTodos = todos.map((todo) => ({ ...todo, isDone: newStatus }));
    setTodos(updatedTodos);
    setAllDone(newStatus);
  };

  const clearDoneTodos = () => {
    const filtered = todos.filter((todo) => !todo.isDone);
    setTodos(filtered);
  };

  const doneCount = todos.filter(todo => !todo.isDone).length;

  return (
    <Router>
      <div className='flex flex-col justify-center items-center w-full'>
        <h1 className='text-[#b83f45] text-[5rem] font-[200]'>todos</h1>
        <div className='flex flex-col justify-center items-center app-shadow'>
          <Form todos={todos} addTodo={addTodo} finishAllTodos={finishAllTodos} />
          <div className='w-[34.375rem] max-sm:w-[98%]'>
            <Routes>
              <Route path="/" element={<AllTodos todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />} />
              <Route path="/active" element={<ActiveTodos todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />} />
              <Route path="/completed" element={<CompletedTodos todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />} />
            </Routes>
          </div>
          <Filters todos={todos} doneCount={doneCount} clearDoneTodos={clearDoneTodos} />
        </div>

        <div className="mt-16 text-sm text-center">
          <p className='mb-2'>Double-click to edit a todo</p>
          <p>Created by <a href='https://github.com/GustavoWustemberg' className='font-bold' title='Credits'>Gustavo Wustemberg</a> for the ReactFrontendJunior2024 Challenge</p>
        </div>

      </div>
    </Router>
  );
}

export default App;
