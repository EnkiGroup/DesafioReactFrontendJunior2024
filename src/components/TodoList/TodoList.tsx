import React, { useMemo } from "react"

import { useLocation } from "react-router-dom"
import { useTodoContext } from "../../context/TodoContext"
import TodoItem from "../TodoItem/TodoItem"

/**
 * Renders the list of todos based on the current pathname filter.
 *
 * @return {JSX.Element} The JSX element representing the list of visible todos.
 */
const TodoList: React.FC = () => {
  const { state } = useTodoContext()
  const { pathname } = useLocation()

  const visibleTodos = useMemo(
    () =>
      state.todos.filter((todo) => {
        if (pathname === "/active") return !todo.isDone
        if (pathname === "/completed") return todo.isDone
        return todo
      }),
    [state.todos, pathname]
  )

  return (
    <ul className='todo-list'>
      {visibleTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

export default TodoList
