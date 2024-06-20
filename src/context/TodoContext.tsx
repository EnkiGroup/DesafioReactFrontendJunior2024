import React, { createContext, useContext, useReducer } from "react"
import { Todo } from "../models/Todo"
import {
  ADD_TODO,
  REMOVE_COMPLETED_TODOS,
  REMOVE_TODO,
  TOGGLE_TODO,
} from "../utils/constants"

interface TodoState {
  todos: Todo[]
}

interface TodoAction {
  type: "ADD_TODO" | "REMOVE_TODO" | "TOGGLE_TODO" | "REMOVE_COMPLETED_TODOS"
  payload?: Todo
}

const TodoContext = createContext<
  { state: TodoState; dispatch: React.Dispatch<TodoAction> } | undefined
>(undefined)

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return { todos: [...state.todos, action.payload!] }
    case REMOVE_TODO:
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload!.id),
      }
    case TOGGLE_TODO:
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload!.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      }
    case REMOVE_COMPLETED_TODOS:
      return {
        todos: state.todos.filter((todo) => !todo.completed),
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
