import { useContext } from "react";
import { Task } from "../../types"
import { TaskContext } from "../../TaskContext";

export default function Tasks (){
    const {tasks} = useContext(TaskContext);
    return (
        <ul>
            {tasks.map((task:Task)=>(<li key={task.id}>{`${task.id} ${task.title} ${task.isDone}`}</li>))}
        </ul>
    )
}