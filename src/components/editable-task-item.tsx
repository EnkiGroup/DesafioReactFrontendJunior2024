import { TriangleAlert } from "lucide-react"
import { useTasksContext } from "../contexts/tasks-context"
import { useInputValidation } from "../hooks/use-input-validation"

import { Task } from "../types"

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <input
        type="text"
        {...register("title")}
        className=" w-full px-2 py-4 pl-14 text-2xl placeholder:italic placeholder:text-2xl placeholder:font-normal"
      />
      {errors.title && (
        <TriangleAlert className="absolute top-1/2 right-4 -translate-y-1/2 text-red-800" />
      )}
    </form>
  )
}