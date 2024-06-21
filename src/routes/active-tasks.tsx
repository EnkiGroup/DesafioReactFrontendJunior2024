import { useTasksContext } from "../contexts/tasks-context"

import { TaskItem } from "../components/task-item"

export function ActiveTasks() {
  const { tasks } = useTasksContext()


    return (
      <ul className="flex flex-col z-0">
        {tasks?.map(task => !task.isDone ? <TaskItem key={task.id} task={task}/> : null)}
      </ul>
    )
}