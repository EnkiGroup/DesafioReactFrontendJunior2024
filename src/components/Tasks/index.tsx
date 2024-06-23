/** @jsxImportSource @emotion/react */
import { useCallback, useContext, useMemo } from "react";
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
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match) => map[match]);
};

const hasValidMin = (value: string, min: number) => {
    return value.length >= min;
};

function Item({ task }: Props) {
    const { tasks, setTasks } = useContext(TaskContext);

    const toggleItem = useCallback((checked: boolean) => {
        setTasks(tasks.map(item => item.id === task.id ? { ...task, isDone: checked } : item));
    }, [tasks, setTasks, task]);

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
            const value = e.target.value.trim();

            if (!hasValidMin(value, 2)) return;

            handleUpdate(sanitize(value));
        }
    }, [handleUpdate]);
    return (
        <li  key={task.id} id={`item-${task.id}`} css={listTasksItem(task.isDone)}>
            <div>
                <input type="checkbox" className="toggle" onKeyDown={handleKeyDown} onChange={e => toggleItem(e.target.checked)} />
                <label onDoubleClick={enableWrite}>{task.title}</label>
                <button onClick={removeItem}></button>
            </div>
            <input
            type='text' 
            defaultValue={task.title}
            className="edit"
            name='name'
            onKeyDown={handleKeyDown} 
            onBlur={handleBlur}
            />
        </li>
        // <li key={task.id} css={listTasksItem(task.isDone)}>
        //     {isWritable ? (
        //         // <input
        //         //     type="text"
        //         //     autoFocus
        //         //     defaultValue={task.title}
        //         //     className="edit"
        //         //     onBlur={handleBlur}
        //         //     onKeyDown={handleKeyDown}
        //         // />
        //         <>
        //             <input type="text" id="fname" name="fname" autoFocus={isWritable}/>
        //             <label htmlFor="fname">First name:</label>
        //         </>
        //     ) : (
        //         <>
        //             <input type="checkbox" className="toggle" onChange={e => toggleItem(e.target.checked)} />
        //             <label onDoubleClick={handleDoubleClick}>{task.title}</label>
        //             <button onClick={removeItem}></button>
        //         </>
        //     )}
        // </li>
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
