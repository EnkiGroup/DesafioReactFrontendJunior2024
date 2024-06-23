import { FormEvent, useEffect, useRef, useState } from "react";
import { Todo } from "../types/Todo"

type TodoProps = {
    todo: Todo;
    handleDeleteTodo: (id: number) => void;
    handleToggleActive: (id: number) => void;
    handleUpdateDescription: (id: number, newDescription: string) => void
}

export default function TodoItem({ todo, handleDeleteTodo, handleToggleActive, handleUpdateDescription }: TodoProps) {
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

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
        const newDescription = inputRef.current!.value;
        if (newDescription === "") {
            return
        }
        handleUpdateDescription(todo.id, newDescription);
    }

    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            setIsEditing(false);
            handleSubmit(event as any);
        }
    }


    return (

        <div>
            {!isEditing &&
                <div
                    className="flex justify-between items-center" onDoubleClick={handleDoubleClick}>
                    <div
                        id="toggle-active"
                        className="relative flex items-center justify-center h-11 w-14"
                        onClick={() => handleToggleActive(todo.id)}
                    >
                        <input
                            type="checkbox"
                            className={`absolute left-2 appearance-none rounded-full h-5 w-5 border ${todo.isCompleted ? "border-green-800" : "border-gray-500"}`}
                        />
                        <div id="check-icon" className="absolute top-[-2px] right-[3px] flex justify-center items-center h-full w-11">
                            <div className={`border-green-800 border-b-2 border-r-2 h-3 w-2 rotate-45 transform ${todo.isCompleted ? "" : "hidden"}`}></div>
                        </div>
                    </div>
                    <div className="bg-white w-full pl-4 " >
                        {todo.description}
                    </div>
                    <div id="delete" className="flex justify-center items-center h-full w-11">
                        <p onClick={() => handleDeleteTodo(todo.id)} className="hover:text-gray-500 cursor-pointer active:scale-90">X</p>
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
                        defaultValue={todo.description}
                    >  
                    </input>
                </div>
            }
        </div>

    )
}
