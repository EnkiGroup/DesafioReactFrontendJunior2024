import { Todo } from "../models/Todo"
import { useTodoContext } from "../context/TodoContext"
import * as todoService from "../services/todoService"

interface TodoItemProps {
  todo: Todo
}
/**
 * Renders a single todo item with checkbox, title, and remove button.
 *
 * @param {TodoItemProps} props - The props object containing the todo item.
 * @param {Todo} props.todo - The todo item to be rendered.
 * @return {JSX.Element} The JSX element representing the todo item.
 */

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { dispatch } = useTodoContext()

  const toggleTodo = async () => {
    console.log("toggleTodo", todo.id)
    await todoService.updateTodo(todo)
    dispatch({ type: "TOGGLE_TODO", payload: todo })
  }

  const removeTodo = async () => {
    console.log("removeTodo", todo.id)
    await todoService.deleteTodo(todo.id)

    dispatch({ type: "REMOVE_TODO", payload: todo })
  }

  return (
    <li className='todo-item'>
      <input
        type='checkbox'
        className='checkbox'
        checked={todo.isDone || false}
        onChange={toggleTodo}
      />
      <span style={{ textDecoration: todo.isDone ? "line-through" : "none" }}>
        {todo.title}
      </span>
      <button onClick={removeTodo} />
    </li>
  )
}

export default TodoItem
