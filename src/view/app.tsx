import React, { useCallback, useEffect, useMemo } from "react"
import { Input } from "../components/Input"
import { useTodoContext } from "../context/TodoContext"
import { ADD_TODO } from "../utils/constants"
import TodoItem from "../components/TodoItem"
import axios from "axios"
import Footer from "../components/Footer"
import { useLocation } from "react-router-dom"

const App: React.FC = () => {
  const { state, dispatch } = useTodoContext()
  const { pathname } = useLocation()

  const visibleTodos = useMemo(
    () =>
      state.todos.filter((todo) => {
        if (pathname === "/active") return !todo.completed
        if (pathname === "/completed") return todo.completed
        return todo
      }),
    [state.todos, pathname]
  )

  const addItem = useCallback(
    (title) => {
      dispatch({
        type: ADD_TODO,
        payload: {
          title,
          id: Date.now().toString(),
          completed: false,
        },
      })
      console.log("entrando")
    },
    [dispatch]
  )

  useEffect(() => {
    axios.get("http://localhost:5000/todos").then((response) => {
      response.data.forEach((todo: any) => {
        dispatch({ type: ADD_TODO, payload: todo })
      })
    })
  }, [dispatch])

  useEffect(() => {
    console.log("pathname", pathname)
  }, [pathname])

  return (
    <>
      <header>
        <h1 className='title'>todos</h1>
      </header>
      <section className='todo-app'>
        <Input
          onSubmit={addItem}
          defaultValue={""}
          label='What needs to be done?'
          placeholder='What needs to be done?'
        />
        <ul className='todo-list'>
          {visibleTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
        <Footer />
      </section>
    </>
  )
}

export default App
