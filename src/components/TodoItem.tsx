import { FormEvent, useEffect, useRef, useState } from "react";
import { useTodosContext } from "../store/todos-context";
import { TodoProps } from "../types/TodoItemProps";

export default function TodoItem({ todo }: TodoProps) {
    const todosCtx = useTodosContext();
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);

    const handleDoubleClick = () => {
        setIsEditing(true);
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const newTitle = inputRef.current!.value;
        if (newTitle === "") {
            return
        }
        todosCtx.handleUpdateDescription(todo.id, newTitle);
    }

    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            setIsEditing(false);
            handleSubmit(event as any);
        }
    }

    return (
        <div
            onMouseEnter={() => setIsDeleteVisible(true)}
            onMouseLeave={() => setIsDeleteVisible(false)}>
            {!isEditing &&
                <div
                    className="flex justify-between items-center" onDoubleClick={handleDoubleClick}>
                    <div
                        className="relative flex items-center justify-center h-16 w-14"
                        onClick={() => todosCtx.handleToggleActive(todo.id)}
                    >
                        <input
                            type="checkbox"
                            className={`absolute left-2 appearance-none rounded-full h-8 w-8 border 
                                ${todo.isDone ? "border-green" : "border-gray-1"}`}
                        />
                        <div className="absolute top-[-2px] right-[3px] flex justify-center items-center h-full w-11">
                            <div className={`border-green border-b-2 border-r-2 h-4 w-2 rotate-[35deg] transform 
                                ${todo.isDone ? "" : "hidden"}`}></div>
                        </div>
                    </div>
                    <div className="bg-white w-full pl-4 text-2xl text-black-2" >
                        {todo.title}
                    </div>

                    <div
                        id="delete"
                        className="flex justify-center items-center h-full w-11 active:border border-red"

                    >
                        <p onClick={() => todosCtx.handleDeleteTodo(todo.id)}
                            className={`hover:text-red cursor-pointer active:scale-90 text-lg text-bold
                            ${isDeleteVisible ? 'block' : 'hidden'}`}
                        >X</p>
                    </div>
                </div>
            }

            {isEditing &&
                <div
                    className="flex justify-between items-center"
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={handleKeyDown}
                >
                    <input
                        className={`pl-14 flex bg-white h-11 w-full shadow-md ${isEditing ? 'h-12 outline-none ring-1 ring-red-700 ring-opacity-50 z-10 relative' : ''}`}
                        ref={inputRef}
                        defaultValue={todo.title}
                    >
                    </input>
                </div>
            }
        </div>

    )
}
