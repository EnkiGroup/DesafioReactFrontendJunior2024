import { useTasksContext } from "../contexts/tasks-context";

import { CheckButton } from "./check-button";
import { X } from "lucide-react";

import { Task } from "../types";

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {

  const { toggleTaskCheck, removeTask } = useTasksContext()

  function handleCheck() {
    toggleTaskCheck(task.id)
  }

  function handleRemove() {
    removeTask(task.id)
  }

  return (
    <li className="relative flex items-center gap-4 px-2 py-4 border-t border-gray-200 peer">
      <CheckButton isDone={task.isDone} onCheck={handleCheck} />
      <span className={`text-2xl ${task.isDone ? "text-gray-400 line-through" : ""}`}>
        {task.title}
      </span>
      <X className="remove-icon" onClick={handleRemove} />
    </li>
  )
}