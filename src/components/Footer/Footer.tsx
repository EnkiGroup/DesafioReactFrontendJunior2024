import { useCallback, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { useTodoContext } from "../../context/TodoContext"
import { REMOVE_COMPLETED_TODOS } from "../../utils/constants"
import "./style.scss"
/**
 * Renders the footer component with active todos count and filter links.
 *
 * @return {JSX.Element} The JSX element representing the footer component.
 */

const Footer: React.FC = () => {
  const { state, dispatch } = useTodoContext()
  const { pathname } = useLocation()

  const activeTodos = useMemo(
    () => state.todos.filter((todo) => !todo.isDone),
    [state.todos]
  )

  const removeCompleted = useCallback(
    () =>
      dispatch({
        type: REMOVE_COMPLETED_TODOS,
      }),
    [dispatch]
  )

  if (state.todos.length === 0) return null

  return (
    <footer>
      <span>
        {`${activeTodos.length} ${
          activeTodos.length === 1 ? "item" : "items"
        } left!`}
      </span>
      <ul className='filters'>
        <li>
          <a className={pathname === "/" ? "selected" : ""} href='#/'>
            All
          </a>
        </li>
        <li>
          <a
            className={pathname === "/active" ? "selected" : ""}
            href='#/active'
          >
            Active
          </a>
        </li>
        <li>
          <a
            className={pathname === "/completed" ? "selected" : ""}
            href='#/completed'
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        className='clear'
        disabled={activeTodos.length === state.todos.length}
        onClick={removeCompleted}
      >
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
