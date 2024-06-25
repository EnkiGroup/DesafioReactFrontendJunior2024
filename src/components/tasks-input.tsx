import { useTasksContext } from "../contexts/tasks-context"

import { useInputValidation } from "../hooks/use-input-validation"

import { CheckAllButton } from "./check-all-button"
import { Input } from "./input"

export function TasksInput() {

  const { addTask, isTasksListEmpty, tasksLeft, toggleAllTasksCheck } = useTasksContext()

  const { register, handleSubmit, reset, errors } = useInputValidation()

  const onSubmit = ({ title }: { title: string }) => {
    addTask(title);

    reset();
  };
  
  const areAllTasksDone = !isTasksListEmpty && tasksLeft == 0

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex bg-[#FEFEFE]"
    >
      <CheckAllButton
        isActiveStyle={areAllTasksDone}
        onClick={toggleAllTasksCheck}
      />
      <Input
        placeholder="What needs to be done?"
        {...register("title")}
        error={errors.title}
        data-testid="task-input"
      />
    </form>
  )
}