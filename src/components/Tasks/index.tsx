import { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import { TaskItem } from "../TaskItem";

export function Tasks() {
  const { tasks } = useContext(TaskContext);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id!}>
          <TaskItem item={task} />
        </div>
      ))}
    </div>
  );
}
