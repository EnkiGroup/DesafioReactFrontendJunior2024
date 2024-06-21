import { useTasksContext } from "../contexts/tasks-context"

import { TaskItem } from "../components/task-item"

export function AllTasks() {
  const { tasks } = useTasksContext()

  return (
    <ul className="flex flex-col z-0">
      {tasks?.map((task) => (<TaskItem key={task.id} task={task} />))}
    </ul>
  )
}