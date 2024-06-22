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
  const { todos, setTodos } = useTodo();

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  //Cria um novo todo com o mesmo id e altera o title
  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newTodo = {
      id: todos.find((todo) => todo.title === title)?.id || createRandomString(5),
      title: value,
      isDone: isDone,
    };
    setTodos(todos.map((todo) => (todo.title === title ? newTodo : todo)));
  };

  // Lida com o evento de onBlur, alterando o estado de isEditing para false
  const handleBlur = () => {
    setIsEditing(false);
  };

  // Classes tailwind para o input type text
  const inputbox =
    "block w-1/3 p-4 focus:ring-0 mx-auto bg-white drop-shadow-md text-2xl focus:border-red-700 active:border-red-700 border-gray-300 border-solid border-2 align-bottom";

  return (
    <div>
      {isEditing ? (
        <div className="relative">
          <input
            className={inputbox}
            type="text"
            value={title}
            onChange={handleChangeContent}
            onBlur={handleBlur}
          />
        </div>
      ) : (
        <div className={inputbox} onDoubleClick={handleDoubleClick}>
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
        </div>
      )}
    </div>
  );
}
