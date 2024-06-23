/** @jsxImportSource @emotion/react */
import { useCallback, useContext } from "react";
import {inputapp, inputbox,toogle, tooglebox} from "./styles";
import { Task } from "../../types";
import { TaskContext } from "../../TaskContext";


const sanitize = (string:string) => {
    const map:{[key: string]: string} = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match) => map[match]);
};

const hasValidMin = (value:string, min:number) => {
    return value.length >= min;
};
type Props={
    onSubmit:Function, 
    placeholder?:string, 
    label?:string, 
    defaultValue?:string, 
    onBlur?:Function 
}
export function Input({ onSubmit, placeholder, label, defaultValue, onBlur }:Props) {
    const {tasks} = useContext(TaskContext);
    const handleBlur = useCallback(() => {
        if (onBlur)
            onBlur();
    }, [onBlur]);

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter") {
                const value = e.target.value.trim();

                if (!hasValidMin(value, 2))
                    return;

                onSubmit(sanitize(value));
                e.target.value = "";
            }
        },
        [onSubmit]
    );

    return (
        <input type="text" placeholder={placeholder} className="edit" defaultValue={defaultValue} onKeyDown={handleKeyDown} onBlur={handleBlur}/>
    );
}
