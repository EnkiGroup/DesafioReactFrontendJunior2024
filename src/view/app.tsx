import React, { useCallback, useEffect } from "react"
import { useTodoContext } from "../context/TodoContext"
import { ADD_TODO, API_URL } from "../utils/constants"
import axios from "axios"
import * as todoService from "../services/todoService"
import Input from "../components/Input/Input"
import TodoList from "../components/TodoList/TodoList"
import Footer from "../components/Footer/Footer"

const App: React.FC = () => {
  const { dispatch } = useTodoContext()

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
    axios.get(API_URL).then((response) => {
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
        <TodoList />
        <Footer />
      </section>
    </>
  )
}

export default App
