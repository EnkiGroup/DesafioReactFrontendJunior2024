import { Tasks } from "../@types"

const BASE_URL = 'https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos'

export const fetchTasks = async (): Promise<Tasks[] | null> => {
  const response = await fetch(BASE_URL)
  const data = await response.json()
  return data
}