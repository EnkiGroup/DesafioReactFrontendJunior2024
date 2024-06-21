import React from "react";
import { Todo } from "../app";
import { Items } from "../components/Items";
import { Filters } from "../components/Filters";
import { useLocation } from "react-router-dom";

type StatusArgsProps = {
  removeTodo: (id: string) => void;
  toggleTodoStatus: (id: string) => void;
  updateTodoTitle: (id: string, newTitle: string) => void;
  removeAllCompletedTodos: () => void;
  todoList: Todo[];
};

export const StatusTodo: React.FC<StatusArgsProps> = ({
  removeTodo,
  toggleTodoStatus,
  updateTodoTitle,
  removeAllCompletedTodos,
  todoList,
}) => {
  let location = useLocation();
  let path = location.pathname;
  return (
    <>
      {/* Todo List */}
      <ol className="text-xl *:mt-3">
        {todoList
          .filter((todo) => (path === "/actives" ? !todo.isDone : todo.isDone))
          .map((todo, index) => (
            <Items
              key={index}
              removeTodo={removeTodo}
              toggleTodoStatus={toggleTodoStatus}
              updateTodoTitle={updateTodoTitle}
              todo={todo}
            />
          ))}
      </ol>
      {/* Filters */}
      <Filters
        todoList={todoList}
        removeAllCompletedTodos={removeAllCompletedTodos}
      />
    </>
  );
};
