import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import { createRandomString } from "../../utils/generate-uuid";

export default function Inputbar() {
  const [currentValue, setCurrentValue] = useState("");
  
  const {addTodo} = useTodo();
  const handleAddTodo = () => {
    addTodo({
      id: createRandomString(5),
      content: currentValue,
      isSelected: false
    })
    setCurrentValue("");
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
    
  }
  return (
    <div>
      <input
        onKeyDown={handleKeyDown} // Dispara um evento ao clicar em uma tecla
        onChange={(event) => setCurrentValue(event.target.value)} 
        value={currentValue}
        type="text"
        placeholder="What needs to be done?"
        className="block w-1/3 p-4 focus:ring-0 mx-auto bg-white drop-shadow-md text-2xl focus:border-red-700 active:border-red-700 border-gray-300 border-solid border-2 align-bottom"
      />
    </div>
  );
}
