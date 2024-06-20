import axios from "axios"
import { Todo } from "../models/Todo"
import { API_URL } from "../utils/constants"

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(API_URL)
  return response.data
}

export const addTodo = async (todo: Todo): Promise<Todo> => {
  const response = await axios.post(API_URL, todo)
  console.log("addTodo", response)
  return response.data
}

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/${todo.id}`, todo)
  console.log("updateTodo", response)
  return response.data
}

export const deleteTodo = async (id: number): Promise<void> => {
  console.log("deleteTodo", id)
  await axios.delete(`${API_URL}/${id}`)
}
