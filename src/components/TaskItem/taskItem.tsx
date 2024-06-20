import { Task } from "../../types/types";

type TaskItemProps = {
    task: Task;
    index: number;
    handleTaskStatus: (index: number) => void;
    removeTask: (index: number) => void;
}

export default function taskItem({ task, index, handleTaskStatus, removeTask }: TaskItemProps){
    return (
        <li className="item_container">
            <input
            type="checkbox"
            name="item_status"
            className=""
            checked={task.isDone}
            onChange={() => handleTaskStatus(index)}
            />
        <div className="item_title">{task.title}</div>
        <button className="" onClick={() => removeTask(index)}>×</button>
        </li>
    );
}