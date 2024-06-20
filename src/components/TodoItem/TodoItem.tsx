import React, { useState } from "react"
import * as todoService from "../../services/todoService"
import { Todo } from "../../models/Todo"
import { useTodoContext } from "../../context/TodoContext"
import "./style.scss"

interface TodoItemProps {
  todo: Todo
}

/**
 * Renders a single todo item with the ability to toggle, edit, and remove the todo.
 *
 * @param {TodoItemProps} todo - The todo item to be displayed and managed.
 * @returns {JSX.Element} The JSX element representing the todo item.
 */
const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { dispatch } = useTodoContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)

  const toggleTodo = async () => {
    const updatedTodo = { ...todo, isDone: !todo.isDone }
    await todoService.updateTodo(updatedTodo)
    dispatch({ type: "TOGGLE_TODO", payload: updatedTodo })
  }

  const removeTodo = async () => {
    await todoService.deleteTodo(todo.id)
    dispatch({ type: "REMOVE_TODO", payload: todo })
  }

  const handleEdit = () => setIsEditing(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value)
  }

  const handleBlur = async () => {
    if (editTitle !== todo.title) {
      const updatedTodo = { ...todo, title: editTitle }
      await todoService.updateTodo(updatedTodo)
      dispatch({ type: "UPDATE_TODO", payload: updatedTodo })
    }
    setIsEditing(false)
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await handleBlur()
    } else if (e.key === "Escape") {
      setIsEditing(false)
      setEditTitle(todo.title)
    }
  }

  return (
    <li className='todo-item'>
      <input
        type='checkbox'
        className='checkbox'
        checked={todo.isDone || false}
        onChange={toggleTodo}
      />
      {isEditing ? (
        <input
          type='text'
          value={editTitle}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          style={{ textDecoration: todo.isDone ? "line-through" : "none" }}
          onDoubleClick={handleEdit}
        >
          {todo.title}
        </span>
      )}
      {!isEditing && <button onClick={removeTodo} />}
    </li>
  )
}

export default TodoItem
