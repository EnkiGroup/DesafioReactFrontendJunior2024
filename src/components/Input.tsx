import { useState } from "react";

export default function Input() {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div
            id="holder"
            className={`flex bg-white h-11 w-full shadow-md ${isFocused ? 'ring-1 ring-red-700 ring-opacity-50' : ''}`}
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
            />

        </div>
    )
}
