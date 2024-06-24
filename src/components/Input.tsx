import { FormEvent, useRef, useState } from "react";
import { useTodosContext } from "../store/todos-context";

export default function Input() {
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
            className={`flex bg-white-2 h-16 w-full shadow-md 
                ${isFocused ? 'ring-2 ring-red ring-opacity-50 z-10 relative' : ''}`
            }
            onKeyDown={handleKeyDown}
        >
            <div 
                className={`flex justify-center items-center h-full w-11 
                    ${todosCtx.todos.length === 0 ? 'hidden' : ''}`
                }
                onClick={() => todosCtx.handleSetAllCompleted()}
                >
                <div className=" border-gray-1 border-b-[3px] border-r-[3px] h-3 w-3 rotate-45 transform"></div>
            </div>

            <input
                type="text"
                placeholder="What needs to be done?"
                className={`focus:outline-none italic text-2xl text-gray-3 font-thin w-full 
                    ${todosCtx.todos.length === 0 ? 'pl-[57px]' : ' pl-4'}`
                }
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={description}
                
            />
        </form>
        
    )
}
