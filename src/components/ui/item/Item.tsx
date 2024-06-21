import { Check, X } from "lucide-react";
import { KeyboardEvent, useEffect, useState } from "react";
import useTodoContext from "../../../contexts/TodoContext";
import { ITodo } from "../../../types/todoTypes";
import Input from "../input/Input";

interface ItemProps {
  todo: ITodo;
}

const Item = ({ todo }: ItemProps) => {
  const [isWritable, setIsWritable] = useState<boolean>(false);
  const [mouseEvent, setMouseEvent] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.title);

  const { completeTodos, updateTodo, deleteTodo } = useTodoContext();

  const handleDoubleClick = (): void => {
    setIsWritable(true);
  };

  const handleOnBlur = () => {
    if (editTodo.trim() !== "") {
      updateTodo(editTodo, todo.id);
    }
    setIsWritable(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && editTodo.trim() !== "") {
      updateTodo(todo.id, editTodo);
      setIsWritable(false);
    }
  };

  useEffect(() => {
    if (isWritable) {
      setEditTodo(todo.title);
    }
  }, [isWritable, todo.title]);

  return (
    <li
      className={
        "relative text-xl " +
        (isWritable ? "shadow-focus p-default" : "border-b p-default")
      }
      onMouseEnter={() => setMouseEvent(true)}
      onMouseLeave={() => setMouseEvent(false)}
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex justify-between">
        {isWritable ? (
          <Input
            autoFocus
            value={editTodo}
            onBlur={handleOnBlur}
            onChange={(e) => setEditTodo(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <>
            <div>
              <label
                htmlFor={todo.id}
                className={
                  "w-[30px] h-[30px] rounded-full absolute left-3 flex justify-center items-center border " +
                  (todo.isDone
                    ? "border-green-500 text-green-500"
                    : "border-gray-400")
                }
              >
                {todo.isDone && <Check />}
                <input
                  id={todo.id}
                  name={todo.id}
                  className="appearance-none"
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={() => completeTodos(todo.id)}
                />
              </label>
              <label
                className={
                  todo.isDone
                    ? "transition duration-500 line-through text-gray-400"
                    : ""
                }
                onDoubleClick={handleDoubleClick}
              >
                {todo.title}
              </label>
            </div>
            {mouseEvent && (
              <button onClick={() => deleteTodo(todo.id)}>
                <X className="text-gray-400 hover:text-red-300" size={20} />
              </button>
            )}
          </>
        )}
      </div>
    </li>
  );
};

export default Item;
