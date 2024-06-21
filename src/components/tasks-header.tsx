import { useTasksContext } from "../contexts/tasks-context"

import { useInputValidation } from "../hooks/use-input-validation"

import { CheckAllButton } from "./check-all-button"
import { TriangleAlert } from "lucide-react"

export function TasksInput() {

  const { addTask } = useTasksContext()

  const { register, handleSubmit, reset, errors } = useInputValidation()

  const onSubmit = ({ title }: { title: string }) => {
    addTask(title);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex bg-[#FEFEFE]">
      <CheckAllButton />
      <input
        type="text"
        placeholder="What needs to be done?"
        {...register("title")}
        className="w-full px-2 py-4 text-2xl placeholder:italic placeholder:font-normal"
      />
      {errors.title && (
        <TriangleAlert className="absolute top-1/2 right-4 -translate-y-1/2 text-red-800" />
      )}
    </form>
  )
}