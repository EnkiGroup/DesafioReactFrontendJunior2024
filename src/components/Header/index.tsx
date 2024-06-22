/** @jsxImportSource @emotion/react */
import { useCallback, useContext } from "react";

import {inputapp, inputbox,toogle, tooglebox} from "./styles";
import { TaskContext } from "../../TaskContext";
import { Task } from "../../types";


const hasValidMin = (value: string, min:number) => {
    return value.length >= min;
};

function nanoid(size = 5) {
    let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
    let id = "";
    let i = size;
    while (i--) {
        id += urlAlphabet[(Math.random() * 64) | 0];
    }
    return id;
}

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
    return string.replace(reg, (match:string ) => map[match]);
  };

export default function Header(){
    const {tasks,setTasks} = useContext(TaskContext);
    const addItem = useCallback((title:string) => {
        setTasks([{id:nanoid(),title,isDone:false}].concat(tasks))
      },[tasks,setTasks]);
    const toggleAll = useCallback((e)=>{
        setTasks(tasks.map((task:Task)=>(task.isDone !== e.target.checked ? { ...task, isDone: e.target.checked } : task)))
    },[tasks,setTasks])
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter") {
                const value = e.target.value.trim();
    
                if (!hasValidMin(value, 2))
                    return;
    
                addItem(sanitize(value));
                e.target.value = "";
            }
        },
        [addItem]
    );

    return (
        <header>
            <h1>todos</h1>
            <div css={inputbox}>
                <input placeholder="O que precisa ser feito?" css={inputapp} onKeyDown={handleKeyDown}/>
                <div css={tooglebox}>
                    <input type="checkbox" css={toogle(tasks.every((task:Task)=>task.isDone))} checked={tasks.every((task:Task)=>task.isDone)} onChange={toggleAll} />
                    <label></label>
                </div>
            </div>
        </header>
    )
}