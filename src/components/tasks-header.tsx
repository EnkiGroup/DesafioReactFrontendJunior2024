import { ChevronDown, TriangleAlert } from "lucide-react"
import { useInputValidation } from "../hooks/use-input-validation"
import { useTasksContext } from "../contexts/tasks-context"

export function TasksInput() {

  const { addTask, completeAllTasks } = useTasksContext()
  
  const { register, handleSubmit, reset, errors } = useInputValidation()

  const onSubmit = ({ title }: { title: string}) => {
    addTask(title);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex bg-[#FEFEFE]">
      <button
        type="button"
        className="w-14 flex items-center justify-center pr-1"
        onClick={completeAllTasks}
      >
        <ChevronDown color="#777" size={28} />
      </button>
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