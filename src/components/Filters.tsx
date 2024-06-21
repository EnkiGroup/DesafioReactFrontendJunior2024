import { NavLink } from "react-router-dom";
import { Todo } from "../app";

type FilterArgsProps = {
  removeAllCompletedTodos: () => void;
  todoList: Todo[];
};

export const Filters: React.FC<FilterArgsProps> = ({
  todoList,
  removeAllCompletedTodos,
}) => {
  const todosRemaining = todoList.filter((todo) => !todo.isDone).length;
  return (
    <div
      data-testid="filter"
      className="flex justify-between px-2 py-1  border-t border-t-gray-300 mt-4 text-sm"
    >
      <p className="py-1">
        {todosRemaining + `${todosRemaining > 1 ? " items" : " item"}`} left
      </p>
      <nav className="mt-1 *:p-1 *:border *:border-transparent ">
        <NavLink
          activeStyle={{
            border: "1",
            borderColor: "#cbd5e1",
          }}
          to="/"
          exact
          data-testid="all"
          className=" hover:border-gray-300"
        >
          All
        </NavLink>
        <NavLink
          activeStyle={{
            border: "1",
            borderColor: "#cbd5e1",
          }}
          to="/actives"
          className="mx-1 hover:border-gray-300 "
        >
          Active
        </NavLink>
        <NavLink
          activeStyle={{
            border: "1",
            borderColor: "#cbd5e1",
          }}
          to="/completed"
          className=" hover:border-gray-300 "
        >
          Completed
        </NavLink>
      </nav>
      <button
        title="Remove all completed todos"
        aria-label="Remove all completed todos"
        className="hover:underline"
        onClick={() => removeAllCompletedTodos()}
      >
        Clear completed
      </button>
    </div>
  );
};
