import { useTasksContext } from "../contexts/tasks-context"
import { useInputValidation } from "../hooks/use-input-validation"

import { Task } from "../types"

interface ReadableTaskItemProps {
  task: Task
  backToReadable: () => void
}

export function EditableTaskItem({ task: { id, title }, backToReadable }: ReadableTaskItemProps) {

  const { updateTaskTitle } = useTasksContext()

  const { register, handleSubmit } = useInputValidation(title)

  function onSubmit({title}: {title: string}) {
    updateTaskTitle({id, title})

    backToReadable()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <input
        type="text"
        {...register("title")}
        className=" w-full px-2 py-4 pl-14 text-2xl placeholder:italic placeholder:text-2xl placeholder:font-normal"
      />
    </form>
  )
}