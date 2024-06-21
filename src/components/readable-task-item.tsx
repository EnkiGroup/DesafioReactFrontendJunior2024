import { useTasksContext } from "../contexts/tasks-context";

import { CheckButton } from "./check-button";
import { X } from "lucide-react";

import { Task } from "../types";

interface ReadableTaskItemProps {
  task: Task
}

export function ReadableTaskItem({ task }: ReadableTaskItemProps) {

  const { toggleTaskCheck, removeTask } = useTasksContext()

  function handleCheck() {
    toggleTaskCheck(task.id)
  }

  function handleRemove() {
    removeTask(task.id)
  }

  return (
    <>
      <CheckButton isDone={task.isDone} onCheck={handleCheck} />
      <span className={`w-full px-2 py-4 text-2xl ${task.isDone ? "text-gray-400 line-through" : "text-[#484848]"}`}>
        {task.title}
      </span>
      <X className="remove-icon" onClick={handleRemove} />
    </>
  )
}