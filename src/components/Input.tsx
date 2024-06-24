import { FormEvent, useContext, useRef, useState } from "react";
import { useTodosContext } from "../store/todos-context";
import { InputProps } from "../types/InputProps";

export default function Input({ handleAddTodo, handleSetAllCompleted }: InputProps) {
    const todosCtx = useTodosContext();
    const [isFocused, setIsFocused] = useState(false);
    const description = useRef<HTMLInputElement>(null);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const enteredDescription = description.current!.value;
        if (enteredDescription === "") {
            return
        }
        event.currentTarget.reset()
        todosCtx.handleAddTodo(enteredDescription);
    }

    function handleKeyDown(event : React.KeyboardEvent) {
       if (event.key === 'Enter') {
          handleSubmit(event as any);
        }
      }

    return (
        <form
            id="holder"
            className={`flex bg-white h-11 w-full shadow-md ${isFocused ? 'ring-1 ring-red-700 ring-opacity-50 z-10 relative' : ''}`}
            onKeyDown={handleKeyDown}
        >
            <div 
                id="arrow-down" 
                className="flex justify-center items-center h-full w-11"
                onClick={() => handleSetAllCompleted()}
                >
                <div className=" border-zinc-500 border-b-2 border-r-2 h-2 w-2 rotate-45 transform"></div>
            </div>

            <input
                type="text"
                placeholder="What needs to be done?"
                className="focus:outline-none italic text-base pl-4 w-full"
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={description}
            />
        </form>
    )
}
