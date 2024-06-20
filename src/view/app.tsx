import React, { useCallback, useEffect, useMemo } from "react"
import { Input } from "../components/Input"
import { useTodoContext } from "../context/TodoContext"
import { ADD_TODO } from "../utils/constants"
import TodoItem from "../components/TodoItem"
import axios from "axios"
import Footer from "../components/Footer"
import { useLocation } from "react-router-dom"
import * as todoService from "../services/todoService"

const App: React.FC = () => {
  const { state, dispatch } = useTodoContext()
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

  const addItem = useCallback(
    async (title) => {
      const newTodo = {
        title,
        id: Date.now().toString(),
        isDone: false,
      }
      const addedTodo = await todoService.addTodo(newTodo)
      dispatch({
        type: ADD_TODO,
        payload: addedTodo,
      })
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
