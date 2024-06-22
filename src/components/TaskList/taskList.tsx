import { Task } from "../../types/types";
import TaskItem from "../TaskItem/taskItem";

type TaskListProps = {
    todoList: Task[];
};

export default function TaskList({ todoList }: TaskListProps){

    return(
        <ul id="list_container">
            {todoList.map((task, index) => (
                <TaskItem key={task.id} task={task} index={index} />
            ))}
        </ul>
    );
}