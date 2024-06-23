import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import { createRandomString } from "../../utils/generate-uuid";

interface TodoItemProps {
  title: string;
  isDone: boolean;
  onToggle: () => void;
}

export default function TodoItem({ title, isDone, onToggle }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { todos, updateTodo, removeTodo} = useTodo();

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  // Lida com a mudança de conteúdo do input
  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) return;
    const newTodo = {
      id: todos.find((todo) => todo.title === title)?.id || createRandomString(5),
      title: value,
      isDone: isDone,
    };
    updateTodo && updateTodo(newTodo);
     
  };

  // Lida com o evento de onBlur, alterando o estado de isEditing para false
  const handleBlur = () => {
    setIsEditing(false);
  };

  // Lida com a remoção de um todo
  const handleRemoveTodo = () => {
    removeTodo && removeTodo(todos.find((todo) => todo.title === title)?.id || "");
  };

  // Classes tailwind para o input type text
  const inputbox =
    "block lg:w-1/3 md:w-3/4 p-4 focus:ring-0 mx-auto bg-white drop-shadow-md text-2xl focus:border-red-700 active:border-red-700 border-gray-300 border-solid border-2 align-bottom";

  return (
    <div className="w-full">
      {isEditing ? (
        <div className="relative">
          <input
            className={inputbox}
            type="text"
            value={title}
            onChange={handleChangeContent}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleBlur();
              }
            }}
          />
        </div>
      ) : (
        <div className={`relative group ${inputbox}`} onDoubleClick={handleDoubleClick}>
          <input
            className="custom-checkbox appearance-none focus:ring-0 w-8 h-8 border-gray-500 rounded-full cursor-pointer checked:border-green-500 bg-white checked:bg-white checked:focus:bg-white checked:hover:bg-white checked:focus:border-green-500 checked:hover:border-green-500"
            type="checkbox"
            checked={isDone}
            onChange={onToggle}
          />
          <label htmlFor="checkbox"></label>
          <span
            className={
              isDone
                ? `ml-12 max-w-1/3 text-gray-500 line-through`
                : `ml-12 max-w-1/3 text-gray-900`
            }
          >
            {title}
          </span>
          <button className="hidden group-hover:block absolute right-2 top-2 text-red-500 text-xl font-bold" onClick={handleRemoveTodo}>
            X
          </button>
        </div>
      )}
    </div>
  );
}
