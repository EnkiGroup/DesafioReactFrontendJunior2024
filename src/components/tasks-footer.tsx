import { useTasksContext } from "../contexts/tasks-context"

import { FilterButton } from "./filter-button"

export function TasksFooter() {

  const { isTasksListEmpty, tasksLeft, clearCompletedTasks } = useTasksContext()

  return (
    <>
      {!isTasksListEmpty && (
        <footer className="flex justify-between px-4 py-2 border-t border-gray-200 sheets-effect">
          <span>{tasksLeft} itens left!</span>
          <nav>
            <ul className="flex gap-4">
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
            className="hover:underline cursor-pointer"
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  )
}