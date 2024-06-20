import React, { createContext, useContext, useReducer } from "react"
import { Todo } from "../models/Todo"
import {
  ADD_TODO,
  REMOVE_COMPLETED_TODOS,
  REMOVE_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
} from "../utils/constants"

interface TodoState {
  todos: Todo[]
}

interface TodoAction {
  type:
    | "ADD_TODO"
    | "REMOVE_TODO"
    | "TOGGLE_TODO"
    | "REMOVE_COMPLETED_TODOS"
    | "UPDATE_TODO"
  payload?: Todo
}

const TodoContext = createContext<
  { state: TodoState; dispatch: React.Dispatch<TodoAction> } | undefined
>(undefined)

/**
 * Reduces the state of the TodoContext based on the given action.
 *
 * @param {TodoState} state - The current state of the TodoContext.
 * @param {TodoAction} action - The action to be performed on the state.
 * @return {TodoState} The updated state of the TodoContext.
 */
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  const { type, payload } = action
  switch (type) {
    case ADD_TODO:
      return { todos: [...state.todos, payload as Todo] }
    case REMOVE_TODO:
      return {
        todos: state.todos.filter((todo) => todo.id !== (payload as Todo).id),
      }
    case TOGGLE_TODO:
      return {
        todos: state.todos.map((todo) =>
          todo.id === (payload as Todo).id
            ? { ...todo, isDone: !todo.isDone }
            : todo
        ),
      }
    case REMOVE_COMPLETED_TODOS:
      return {
        todos: state.todos.filter((todo) => !todo.isDone),
      }
    case UPDATE_TODO:
      return {
        todos: state.todos.map((todo) =>
          todo.id === (payload as Todo).id ? (payload as Todo) : todo
        ),
      }
    default:
      return state
  }
}

export const TodoProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] })

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider")
  }
  return context
}
