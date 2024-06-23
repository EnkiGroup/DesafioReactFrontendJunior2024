import { FormEvent, useRef, useState } from "react";

type InputProps = {
    handleAddTodo: (description: string) => void;
}

export default function Input({handleAddTodo}: InputProps) {
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
        event.currentTarget.reset()
        console.log(enteredDescription)
        handleAddTodo(enteredDescription);
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
            <div id="arrow-down" className="flex justify-center items-center h-full w-11">
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
