import { ButtonDelete, ItemTodo, List } from './style'

const ListTodo = () => {
  return (
    <List>
      <li>
        <ItemTodo>
          <input type="checkbox" name="todo_list" />
          <label htmlFor="todo_list">sdad</label>
          <ButtonDelete />
        </ItemTodo>
      </li>
      <li>
        <ItemTodo>
          <input type="checkbox" name="todo_list" />
          <label htmlFor="todo_list">Item 2</label>
        </ItemTodo>
      </li>
    </List>
  )
}

export default ListTodo
