/** @jsxImportSource @emotion/react */
import { useCallback, useContext, useMemo, useState } from "react";
import { Task } from "../../types";
import { TaskContext } from "../../TaskContext";
import { useLocation } from "react-router-dom";
import { listTasks, listTasksItem } from "./styles";

type Props = {
    task: Task
};

const sanitize = (string: string) => {
    const map: { [key: string]: string } = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/g;
    return string.replace(reg, (match) => map[match]);
};


function Item({ task }: Props) {
    const { tasks, setTasks } = useContext(TaskContext);
    const [isDone, setIsDone] = useState<boolean>(task.isDone || false);
    const [title, setTitle] = useState<string>(task.title || "");

    const changeTaskStatus = useCallback((checked: boolean) => {
        setTasks(tasks.map(item => item.id === task.id ? { ...task, isDone: checked } : item));
        setIsDone(checked)
    }, [tasks, setTasks, setIsDone,task]);

    const updateItem = useCallback((title: string) => {
        setTasks(tasks.map(item => item.id === task.id ? { ...task, title } : item));
    }, [tasks, setTasks, task]);

    const removeItem = useCallback(() => {
        setTasks(tasks.filter(item => item.id !== task.id));
    }, [tasks, setTasks, task]);



    const enableWrite = () => {
        const li = document.querySelector(`#item-${task.id}`)
        if(li){      
            const field = li.querySelectorAll('input')[1];
            const div = li.querySelector('div');
            if(div && field){
                div.style.display = 'none'
                field.style.display = 'block'
                field.focus()
            }
        }
    }
    const disableWrite = useCallback(() => {
        const li = document.querySelector(`#item-${task.id}`)
        if(li){      
            const field = li.querySelectorAll('input')[1];
            const div = li.querySelector('div');
            if(div && field){
                div.style.display = 'block'
                field.style.display = 'none'
                field.focus() 
            }
        }
    },[task])
    const handleBlur = useCallback(() => {
        disableWrite()
    }, [disableWrite]);
    const handleUpdate = useCallback((title: string) => {
        if (title.length === 0) {
            removeItem();
        } else {
            updateItem(title);
        }
        disableWrite();
    }, [removeItem, updateItem,disableWrite]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter") {
            let value = e.target.value.trim();

            if (value.length >= 2) handleUpdate(sanitize(value));
        }
    }, [handleUpdate]);
    return (
        <li  key={task.id} id={`item-${task.id}`} css={listTasksItem(task.isDone)}>
            <div>
                <input type="checkbox" checked={isDone} className="toggle" onChange={e => changeTaskStatus(e.target.checked)} />
                <label onDoubleClick={enableWrite}>{task.title}</label>
                <button onClick={removeItem}></button>
            </div>
            <input
            type='text' 
            value={title}
            className="edit"
            name='name'
            onKeyDown={handleKeyDown} 
            onChange={(e)=>setTitle(e.target.value)}
            onBlur={handleBlur}
            />
        </li>
    );
}

export default function Tasks() {
    const { tasks } = useContext(TaskContext);
    const { pathname: route } = useLocation();

    const visibleTodos = useMemo(
        () =>
            tasks.filter((task) => {
                if (route === "/ativos") return !task.isDone;
                if (route === "/realizados") return task.isDone;
                return task;
            }),
        [tasks, route]
    );

    return (
        <ul css={listTasks}>
            {visibleTodos.map((task: Task) => (
                <Item key={task.id} task={task} />
            ))}
        </ul>
    );
}
