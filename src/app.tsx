import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { All } from "./routes/All";
import { StatusTodo } from "./routes/StatusTodo";

export interface Todo {
  id: string;
  title: string;
  isDone: boolean;
}

export default function App() {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo.trim() !== "") {
      setTodoList([
        ...todoList,
        { id: String(Math.random() * 1000), title: todo, isDone: false },
      ]);
      setTodo("");
    }
  };

  const removeTodo = (id: string): void => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  const toggleTodoStatus = (id: string): void => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
    );
    setTodoList(updatedTodoList);
  };

  const updateTodoTitle = (id: string, newTitle: string): void => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo,
    );
    setTodoList(updatedTodoList);
  };

  const finishAllTodos = (): void => {
    const updatedTodoList = todoList.map((todo) => {
      return { ...todo, isDone: true };
    });
    setTodoList(updatedTodoList);
  };

  const removeAllCompletedTodos = (): void => {
    const updatedTodoList = todoList.filter((todo) => !todo.isDone);
    setTodoList(updatedTodoList);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        fetch(
          "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos",
        )
          .then((res) => res.json())
          .then((data) => setTodoList(data));
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <section className="mt-16">
      <h1 className="text-xl md:text-4xl text-red-700 mb-3 w-fit mx-auto">
        Todos
      </h1>
      <div
        className="relative after:absolute after:bg-gray-100 after:-inset-1 after:-z-40 after:top-5 after:w-4/5 after:md:w-3/5 after:mx-auto after:max-w-[530px] after:h-[110%] after:rounded-[50px]
      "
      >
        <div className="border border-gray-300  p-1 m-1 w-4/5 md:w-3/5 mx-auto rounded-sm max-w-[500px] relative bg-gray-50 ">
          {/* Formulary */}
          <div
            className={`flex justify-between ${
              todoList.length !== 0 && "border-b border-b-gray-300"
            }`}
          >
            <button
              className="mx-2 w-[20px]"
              aria-label="Finish all todos"
              title="Finish all"
              name="Finish all todos"
              onClick={() => finishAllTodos()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`size-6 ${todoList.length === 0 && "text-gray-300"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <form className="grow" name="form" onSubmit={addTodo}>
              <input
                type="text"
                name="todo"
                autoComplete="todo"
                className="p-2 w-full outline-none text-xl bg-gray-50"
                placeholder="What needs to be done?"
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
              />
            </form>
          </div>
          {todoList.length !== 0 && (
            <>
              <Switch>
                <Route exact path="/">
                  <All
                    removeTodo={removeTodo}
                    toggleTodoStatus={toggleTodoStatus}
                    updateTodoTitle={updateTodoTitle}
                    removeAllCompletedTodos={removeAllCompletedTodos}
                    todoList={todoList}
                  />
                </Route>
                <Route path="/actives">
                  <StatusTodo
                    removeTodo={removeTodo}
                    toggleTodoStatus={toggleTodoStatus}
                    updateTodoTitle={updateTodoTitle}
                    removeAllCompletedTodos={removeAllCompletedTodos}
                    todoList={todoList}
                  />
                </Route>
                <Route path="/completed">
                  <StatusTodo
                    removeTodo={removeTodo}
                    toggleTodoStatus={toggleTodoStatus}
                    updateTodoTitle={updateTodoTitle}
                    removeAllCompletedTodos={removeAllCompletedTodos}
                    todoList={todoList}
                  />
                </Route>
              </Switch>
            </>
          )}
          {todoList.length !== 0 ? (
            <div className="absolute w-full -right-[3px] ">
              <div className="absolute h-2 w-[99%] inset-x-0 -bottom-3 bg-gray-100 border border-gray-300 rounded-sm">
                <div className="absolute h-2 w-[97%] mx-auto bg-gray-100 border border-gray-300 -bottom-2 left-2 after:block after:absolute after:bg-gray-200 after:h-12 after:-z-10  after:-inset-x-0 after:w-11/12 after:rounded-3xl after:-top-8 after:mx-auto"></div>
              </div>
            </div>
          ) : (
            <div className="after:absolute after:bg-gray-200 after:-inset-1 after:-z-10 after:mt-3 after:w-4/5 after:md:w-11/12 after:mx-auto after:max-w-[480px] after:h-[110%] after:rounded-[50px]"></div>
          )}
        </div>
      </div>
    </section>
  );
}
