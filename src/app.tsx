import { useState } from "react";
import Header from "./components/Header"
import Input from "./components/Input"
import { Todo } from "./types/Todo";
import TodoList from "./components/TodoList";
import TodosContextProvider, { useTodosContext } from "./store/todos-context";

export default function App() {
  const todosCtx = useTodosContext();
  const [todos, setTodos] = useState<Todo[]>([]);

  function handleAddTodo(description: string) {
    setTodos(prevTodos => {
      const newTodo: Todo = {
        id: Math.random(),
        description: description,
        isCompleted: false
      };
      return [...prevTodos, newTodo]
    })
  }

  function handleDeleteTodo(id: number) {
    setTodos(prevTodos => prevTodos.filter((todo) => todo.id !== id));
  }


  function handleClearCompleted() {
    setTodos(prevTodos => prevTodos.filter((todo) => todo.isCompleted === false));
  }

  function handleToggleActive(id: number) {
    setTodos(prevTodos =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  function handleUpdateDescription(id: number, newDescription: string) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, description: newDescription } : todo
      )
    );
  }

  function handleSetAllCompleted() {
    todos.map((todo) => {
      !todo.isCompleted ?
        setTodos((prevTodos) =>
          prevTodos.map((todo) => ({ ...todo, isCompleted: true }))
        ) :
        setTodos((prevTodos) =>
          prevTodos.map((todo) => ({ ...todo, isCompleted: false }))
        )
    })

  }


  return (
    <TodosContextProvider>
      <div className="block bg-slate-200 min-h-screen h-full">
        <Header />

        <div className="flex justify-center items-top w-full">

          <div className="max-w-[360px] w-5/6">

            <Input
              handleAddTodo={handleAddTodo}
              handleSetAllCompleted={handleSetAllCompleted}
            />
            <TodoList
              handleDeleteTodo={handleDeleteTodo}
              todos={todosCtx.todos}
              handleToggleActive={handleToggleActive}
              handleClearCompleted={handleClearCompleted}
              handleUpdateDescription={handleUpdateDescription}

            />
          </div>
        </div>
      </div>
    </TodosContextProvider>
  );
}
