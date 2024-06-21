import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useTodoContext from "../../contexts/TodoContext";
import { ITodo } from "../../types/todoTypes";
import Item from "../ui/item/Item";

const Main = () => {
  const { pathname: location } = useLocation();
  const { todos, completeAllTodos, allTodosCompleted, setAllTodosCompleted } =
    useTodoContext();
  const [renderizedTodo, setRenderizedTodo] = useState<ITodo[]>([]);

  const handleOnBlur = useCallback(() => {
    setAllTodosCompleted(false);
  }, [setAllTodosCompleted]);

  useEffect(() => {
    const filteredTodos = todos.filter((todo) => {
      if (location === "/active") return !todo.isDone;
      if (location === "/completed") return todo.isDone;
      return true;
    });
    setRenderizedTodo(filteredTodos);
  }, [location, todos]);

  return (
    <main className="relative border border-gray-200">
      {renderizedTodo.length > 0 && (
        <div
          className="absolute top-[-65px] left-0 w-[45px] h-[65px]"
          onClick={completeAllTodos}
        >
          <button
            onBlur={handleOnBlur}
            className={`w-full h-full flex justify-center items-center ${
              allTodosCompleted ? "shadow-focus" : "text-gray-400"
            }`}
          >
            <ChevronDown size={28} />
          </button>
        </div>
      )}
      <ul className="flex flex-col-reverse">
        {renderizedTodo.length > 0 &&
          renderizedTodo.map((todo) => <Item key={todo.id} todo={todo} />)}
      </ul>
    </main>
  );
};

export default Main;
