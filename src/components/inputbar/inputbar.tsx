import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import { createRandomString } from "../../utils/generate-uuid";

export default function Inputbar() {
  const [currentValue, setCurrentValue] = useState("");
  
  const {addTodo, todos, toggleAllTodos} = useTodo();
  const handleAddTodo = () => {
    addTodo({
      id: createRandomString(5),
      isDone: false,
      title: currentValue,
    })
    setCurrentValue("");
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
    
  }

  const inputCassName = "block w-full p-4 focus:ring-0 bg-white drop-shadow-md text-2xl focus:border-red-700 active:border-red-700 border-gray-300 border-solid border-2 align-bottom"
  
  return (
    <div className="relative w-1/3 mx-auto">
      {todos.length > 0 && (
        <button
          onClick={toggleAllTodos}
          className="absolute inset-y-0 left-0 px-5 flex items-center justify-center z-10"
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
        className={
          todos.length > 0
            ? inputCassName + " pl-16"
            : inputCassName + " pl-12"
        }
      />
    </div>
  );
}
