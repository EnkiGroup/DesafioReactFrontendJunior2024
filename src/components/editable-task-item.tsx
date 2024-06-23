import { useTasksContext } from "../contexts/tasks-context"
import { useInputValidation } from "../hooks/use-input-validation"

import { Task } from "../types"
import { Input } from "./input"

interface EditableTaskItemProps {
  task: Task
  exitEditableMode: () => void
}

export function EditableTaskItem({ task: { id, title }, exitEditableMode }: EditableTaskItemProps) {

  const { updateTaskTitle } = useTasksContext()

  const { register, handleSubmit, errors } = useInputValidation(title)

  function onSubmit({ title }: { title: string }) {
    updateTaskTitle({ id, title })

    exitEditableMode()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex pl-12">
      <Input
        {...register("title")}
        error={errors.title}
        onBlur={exitEditableMode}
        data-testid="editable-task-input"
      />
    </form>
  )
}