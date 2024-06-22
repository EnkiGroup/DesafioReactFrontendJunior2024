import { useContext, useMemo } from "react";
import { Task } from "../../types"
import { TaskContext } from "../../TaskContext";
import { useLocation } from "react-router-dom";

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
        <ul>
            {visibleTodos.map((task:Task)=>(<li key={task.id}>{`${task.id} ${task.title} ${task.isDone}`}</li>))}
        </ul>
    )
}