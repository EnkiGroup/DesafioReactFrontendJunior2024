import { Check, X } from "lucide-react";
import { useState } from "react";
import { ITodo } from "../../../types/todoTypes";
import Input from "../input/Input";

interface ItemProps {
  todo: ITodo;
}

const Item = ({ todo }: ItemProps) => {
  const [isWritable, setIsWritable] = useState<boolean>(false);
  const [mouseEvent, setMouseEvent] = useState<boolean>(false);

  const handleDoubleClick = (): void => setIsWritable(true);

  return (
    <li
      className={
        "relative text-xl " +
        (isWritable ? "shadow-focus p-default" : "border-b p-default")
      }
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setMouseEvent(true)}
      onMouseLeave={() => setMouseEvent(false)}
    >
      <div className="flex justify-between">
        {isWritable ? (
          <Input autoFocus />
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
                />
              </label>
              <label
                className={
                  todo.isDone
                    ? "transition duration-500 line-through text-gray-400"
                    : ""
                }
              >
                {todo.title}
              </label>
            </div>
            {mouseEvent && (
              <button>
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
