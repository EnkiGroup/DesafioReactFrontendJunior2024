import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import { createRandomString } from "../../utils/generate-uuid";

export default function Inputbar() {
  const [currentValue, setCurrentValue] = useState("");
  
  const { addTodo, todos, toggleAllTodos } = useTodo();

  const handleAddTodo = () => {
    addTodo({
      id: createRandomString(5),
      isDone: false,
      title: currentValue,
    });
    setCurrentValue("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  const inputClassName =
    "block w-full mx-auto p-4 focus:ring-0 bg-white drop-shadow-md text-2xl focus:border-red-700 active:border-red-700 border-gray-300 border-solid border-2";

  return (
    <div className="relative mx-auto lg:w-1/3 md:w-3/4 w-full">
      <div className="relative">
        {todos.length > 0 && (
          <button
            onClick={toggleAllTodos}
            className="absolute inset-y-0 left-2 px-2 flex items-center justify-center z-10"
          >
            <img src="/assets/down-arrow.svg" alt="toggle" />
          </button>
        )}
        <input
          onKeyDown={handleKeyDown}
          onChange={(event) => setCurrentValue(event.target.value)}
          value={currentValue}
          type="text"
          placeholder="What needs to be done?"
          className={inputClassName + (todos.length > 0 ? " pl-12" : " pl-10")}
        />
      </div>
    </div>
  );
}
