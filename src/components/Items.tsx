import { useState } from "react";
import { Todo } from "../app";

type ItemsArgsProps = {
  removeTodo: (id: string) => void;
  toggleTodoStatus: (id: string) => void;
  updateTodoTitle: (id: string, newTitle: string) => void;
  todo: Todo;
};

export const Items: React.FC<ItemsArgsProps> = ({
  removeTodo,
  toggleTodoStatus,
  updateTodoTitle,
  todo,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");

  return (
    <li data-testid="item" className="flex justify-between items-center  group">
      <div className="flex justify-between items-center w-full">
        <button
          className="rounded-full border border-gray-100 size-7 mr-3 ml-1"
          data-testid={`${todo.id}`}
          onClick={() => toggleTodoStatus(todo.id)}
          title="Finish"
          aria-label="Finish todo"
        >
          {todo.isDone && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              name="svgFinish"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          )}
        </button>
        {editMode ? (
          <>
            <form
              title="edit text"
              name={`${todo.id}`}
              onSubmit={(e) => {
                e.preventDefault();
                updateTodoTitle(todo.id, newTitle);
                setEditMode(false);
              }}
              className="grow"
            >
              <fieldset>
                <label htmlFor="newTodo">
                  <input
                    type="text"
                    name="newTodo"
                    id="newTodo"
                    autoFocus
                    autoComplete=""
                    className=" w-full  text-xl px-2 py-1"
                    placeholder="Type a new title"
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </label>
              </fieldset>
            </form>
            <button
              aria-label="Cancel change"
              className="p-2 ml-2 bg-gray-400 rounded-lg text-sm text-gray-50"
              onClick={() => setEditMode(false)}
              name="Cancel"
            >
              Cancel
            </button>
          </>
        ) : (
          <p
            data-testid={`${todo.id}`}
            title="todo"
            className={`grow ${todo.isDone && "line-through text-gray-500"}`}
            onDoubleClick={() => {
              setEditMode(true);
            }}
          >
            {todo.title}
          </p>
        )}
      </div>
      {!editMode && (
        <button
          aria-label="Remove todo"
          className="hidden group-hover:block text-red-700"
          title="Remove todo"
          onClick={() => {
            removeTodo(todo.id);
            setEditMode(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </li>
  );
};
