/** @jsxImportSource @emotion/react */
import { useCallback, useContext, useMemo } from "react";
import { Task } from "../../types"
import { TaskContext } from "../../TaskContext";
import { useLocation } from "react-router-dom";
import { listTasks, listTasksItem } from "./styles";

type Props = {
    task:Task
}

function Item ({task}:Props) {
    const {tasks,setTasks} = useContext(TaskContext);
    const toggleItem = useCallback((checked:boolean) => {
        setTasks(tasks.map(item=> item.id === task.id? {...task,isDone:checked}: item))
    }, [tasks,setTasks,task]);

    return (
        <li key={task.id} css={listTasksItem(task.isDone)}>
            <input type="checkbox" onChange={e=>toggleItem(e.target.checked)}/>
            <label>{task.title}</label>
        </li>
    )
}


export default function Tasks (){
    const {tasks} = useContext(TaskContext);
    const { pathname: route } = useLocation();

    const visibleTodos = useMemo(
        () =>
            tasks.filter((task) => {
                if (route === "/ativos")
                    return !task.isDone;

                if (route === "/realizados")
                    return task.isDone;

                return task;
            }),
        [tasks, route]
    );
    return (
        <ul css={listTasks}>
            {visibleTodos.map((task:Task)=>(<Item key={task.id} task={task}/>))}
        </ul>
    )
}