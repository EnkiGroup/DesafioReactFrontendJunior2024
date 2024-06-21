import { ChevronDown } from "lucide-react"
import { useInputValidation } from "../hooks/use-input-validation"
import { useTasksContext } from "../contexts/tasks-context"

export function TasksInput() {

  const { register, handleSubmit } = useInputValidation()

  const { completeAllTasks } = useTasksContext()

  return (
    <form onSubmit={handleSubmit} className="flex bg-[#FEFEFE]">
      <button
        type="button"
        className="px-2"
        onClick={completeAllTasks}
      >
        <ChevronDown color="#777" size={28} />
      </button>
      <input
        type="text"
        placeholder="What needs to be done?"
        {...register("title")}
        className=" w-full px-2 py-4 text-2xl placeholder:italic placeholder:text-2xl placeholder:font-normal"
      />
    </form>
  )
}