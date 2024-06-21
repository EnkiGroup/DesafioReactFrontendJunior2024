import { useTasksContext } from "../contexts/tasks-context"
import { useInputValidation } from "../hooks/use-input-validation"

import { Task } from "../types"
import { Input } from "./input"

interface EditableTaskItemProps {
  task: Task
  onEditCompletion: () => void
}

export function EditableTaskItem({ task: { id, title }, onEditCompletion }: EditableTaskItemProps) {

  const { updateTaskTitle } = useTasksContext()

  const { register, handleSubmit, errors } = useInputValidation(title)

  function onSubmit({ title }: { title: string }) {
    updateTaskTitle({ id, title })

    onEditCompletion()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex pl-14">
      <Input
        placeholder="What needs to be done?"
        {...register("title")}
        error={errors.title}
      />
    </form>
  )
}