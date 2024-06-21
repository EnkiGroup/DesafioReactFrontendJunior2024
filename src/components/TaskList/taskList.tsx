import { Task } from "../../types/types";
import TaskItem from "../TaskItem/taskItem";

type TaskListProps = {
    todoList: Task[];
    handleTaskStatus: (index: string) => void;
    removeTask: (index: string) => void;
    updateTaskTitle: (id: string, newTitle: string) => void;
};

export default function TaskList({ todoList, handleTaskStatus, removeTask, updateTaskTitle }: TaskListProps){
    return(
        <ul id="list_container">
            {todoList.map((task, index) => (
                <TaskItem key={task.id} task={task} index={index} handleTaskStatus={handleTaskStatus} removeTask={removeTask} updateTaskTitle={updateTaskTitle} />
            ))}
        </ul>
    );
}