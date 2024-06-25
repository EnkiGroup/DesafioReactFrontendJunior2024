import { useTasksContext } from "../contexts/tasks-context"

import { FilterButton } from "./filter-button"

export function TasksFooter() {

  const { isTasksListEmpty, tasksLeft, clearCompletedTasks } = useTasksContext()

  return (
    <>
      {!isTasksListEmpty && (
        <footer
          className="flex justify-between max-sm:items-center max-sm:justify-center max-sm:flex-wrap max-sm:gap-4 px-4 py-2 bg-white border-t border-gray-200 sheets-effect"
        >
          <span
            className="max-sm:flex-1 max-sm:border max-sm:border-gray-400 max-sm:rounded-[3px] max-sm:flex max-sm:justify-center"
            data-testid="tasks-left"
          >
            {tasksLeft} itens left
          </span>
          <nav className="max-sm:order-first max-sm:mt-2 max-sm:w-full">
            <ul className="flex gap-4 max-sm:justify-between max-sm:w-full">
              <li>
                <FilterButton route={"/"} filterName="All" />
              </li>
              <li>
                <FilterButton route={"/active"} filterName="Active" />
              </li>
              <li>
                <FilterButton route={"/completed"} filterName="Completed" />
              </li>
            </ul>
          </nav>
          <button
            onClick={clearCompletedTasks}
            className="hover:underline cursor-pointer max-sm:flex-1 max-sm:border max-sm:border-gray-400 max-sm:rounded-[3px] max-sm:flex max-sm:justify-center"
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  )
}