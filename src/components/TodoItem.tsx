import { Todo } from "../models/Todo"
import { useTodoContext } from "../context/TodoContext"

interface TodoItemProps {
  todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { dispatch } = useTodoContext()

  const toggleTodo = () => {
    dispatch({ type: "TOGGLE_TODO", payload: todo })
  }

  const removeTodo = () => {
    dispatch({ type: "REMOVE_TODO", payload: todo })
  }

  return (
    <li className='todo-item'>
      <input
        type='checkbox'
        className='checkbox'
        checked={todo.completed || false}
        onChange={toggleTodo}
      />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.title}
      </span>
      <button onClick={removeTodo} />
    </li>
  )
}

export default TodoItem
