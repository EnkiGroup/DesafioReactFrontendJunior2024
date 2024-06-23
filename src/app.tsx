import { useState } from "react";
import Header from "./components/Header"
import Input from "./components/Input"
import { Todo } from "./types/Todo";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function handleAddTodo(description: string) {
    setTodos(prevTodos => {
      const newTodo: Todo = {
        id: Math.random(),
        description: description,
        isActive: false
      };
      return [...prevTodos, newTodo]
    })
  }

  


  return (

    <div className="block bg-slate-200 min-h-screen h-full">
      <Header />

      <div className="flex justify-center items-top w-full">

        <div className="max-w-[360px] w-5/6">

          <Input handleAddTodo={handleAddTodo} />
          <TodoList todos={todos} />


        </div>
      </div>
    </div>
  );
}
