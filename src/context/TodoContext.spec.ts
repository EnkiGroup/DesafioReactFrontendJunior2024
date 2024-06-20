import { Todo } from "../models/Todo"
import { TodoAction, TodoState, todoReducer } from "./TodoContext"

describe("todoReducer", () => {
  const initialState: TodoState = { todos: [] }

  it("should add a todo", () => {
    const todo: Todo = { id: "1", title: "Test todo", isDone: false }
    const action: TodoAction = { type: "ADD_TODO", payload: todo }
    const newState = todoReducer(initialState, action)
    expect(newState.todos).toEqual([todo])
  })

  it("should remove a todo", () => {
    const todo1: Todo = { id: "1", title: "Test todo 1", isDone: false }
    const todo2: Todo = { id: "2", title: "Test todo 2", isDone: false }
    const state: TodoState = { todos: [todo1, todo2] }
    const action: TodoAction = { type: "REMOVE_TODO", payload: todo2 }
    const newState = todoReducer(state, action)
    expect(newState.todos).toEqual([todo1])
  })

  it("should toggle a todo", () => {
    const todo: Todo = { id: "1", title: "Test todo", isDone: false }
    const state: TodoState = { todos: [todo] }
    const action: TodoAction = { type: "TOGGLE_TODO", payload: todo }
    const newState = todoReducer(state, action)
    expect(newState.todos[0].isDone).toBe(true)
  })

  it("should remove completed todos", () => {
    const todo1: Todo = { id: "1", title: "Test todo 1", isDone: false }
    const todo2: Todo = { id: "2", title: "Test todo 2", isDone: true }
    const state: TodoState = { todos: [todo1, todo2] }
    const action: TodoAction = { type: "REMOVE_COMPLETED_TODOS" }
    const newState = todoReducer(state, action)
    expect(newState.todos).toEqual([todo1])
  })

  it("should update a todo", () => {
    const todo: Todo = { id: "1", title: "Test todo", isDone: false }
    const updatedTodo: Todo = { id: "1", title: "Updated todo", isDone: false }
    const state: TodoState = { todos: [todo] }
    const action: TodoAction = { type: "UPDATE_TODO", payload: updatedTodo }
    const newState = todoReducer(state, action)
    expect(newState.todos[0]).toEqual(updatedTodo)
  })
})
