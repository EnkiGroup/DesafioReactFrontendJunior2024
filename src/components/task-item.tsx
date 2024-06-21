import { useState } from "react";

import { ReadableTaskItem } from "./readable-task-item";
import { EditableTaskItem } from "./editable-task-item";

import { Task } from "../types";

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditable, setIsEditable] = useState<boolean>(false)

  function handleBackToReadable() {
    setIsEditable(false)
  }

  return (
    <li
      onDoubleClick={() => setIsEditable(!isEditable)}
      className="relative flex items-center border-t border-gray-200 peer"
    >
      {isEditable
        ?
        (<EditableTaskItem task={task} onEditCompletion={handleBackToReadable} />)
        :
        (<ReadableTaskItem task={task} />)
      }
    </li>
  )
}
