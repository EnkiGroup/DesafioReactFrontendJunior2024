import { Task } from "../../types/types";
import TaskItem from "../TaskItem/taskItem";

type TaskListProps = {
    todoList: Task[];
    handleTaskStatus: (index: number) => void;
    removeTask: (index: number) => void;
};

export default function taskList({ todoList, handleTaskStatus, removeTask }: TaskListProps){
    return(
        <ul id="list_container">
            {todoList.map((task, index) => (
                <TaskItem key={index} task={task} index={index} handleTaskStatus={handleTaskStatus} removeTask={removeTask} />
            ))}
        </ul>
    );
}