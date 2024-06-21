import { useTasksContext } from "../contexts/tasks-context"

import { ChevronDown } from "lucide-react"

export function CheckAllButton() {

  const { tasks, tasksLeft, toggleAllTasksCheck } = useTasksContext()

  return (
    <button
      type="button"
      className="w-14 flex items-center justify-center pr-1"
      onClick={toggleAllTasksCheck}
    >
      <ChevronDown
        size={28}
        className={(tasks.length == 0 || tasksLeft) ? "text-[#aaa]" : "text-[#333]"}
      />
    </button>
  )
}