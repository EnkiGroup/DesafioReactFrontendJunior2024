import { useLocation } from "react-router-dom"
import { useTasksContext } from "../contexts/tasks-context"

import { TaskItem } from "./task-item"

export function TasksList() {

  const { tasks } = useTasksContext()

  const { pathname } = useLocation()

  if (pathname === "/active") {
    return (
      <ul className="flex flex-col z-0">
        {tasks?.map(task => !task.isDone ? <TaskItem task={task}/> : null)}
      </ul>
    )
  } else if (pathname === "/completed") {
    return (
      <ul className="flex flex-col z-0">
        {tasks?.map(task => task.isDone ? <TaskItem task={task}/> : null)}
      </ul>
    )
  }

  return (
    <ul className="flex flex-col z-0">
      {tasks?.map((task) => (<TaskItem key={task.id} task={task} />))}
    </ul>
  )
}