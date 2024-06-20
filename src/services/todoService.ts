import axios from "axios"
import { Todo } from "../models/Todo"
import { API_URL } from "../utils/constants"
/**
 * Retrieves a list of todos from the API.
 *
 * @return {Promise<Todo[]>} A promise that resolves to an array of Todo objects.
 */
export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(API_URL)
  return response.data
}

/**
 * Adds a new todo to the API.
 *
 * @param {Todo} todo - The todo object to be added.
 * @return {Promise<Todo>} A promise that resolves to the added todo object.
 */
export const addTodo = async (todo: Todo): Promise<Todo> => {
  const response = await axios.post(API_URL, todo)
  return response.data
}

/**
 * Updates a todo in the API.
 *
 * @param {Todo} todo - The todo object to be updated.
 * @return {Promise<Todo>} A promise that resolves to the updated todo object.
 */
export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/${todo.id}`, todo)
  return response.data
}

/**
 * Deletes a todo from the API.
 *
 * @param {string} id - The ID of the todo to be deleted.
 * @return {Promise<void>} A promise that resolves when the todo is successfully deleted.
 */
export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`)
}
