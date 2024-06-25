import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { ButtonDelete, ItemTodo, List } from './style'

import {
  Todo,
  capturaNewTitle,
  deleteItem,
  editItem,
  isCompleted
} from '../../../store/reducer/reducerStates'

type Props = {
  listTodo: Todo[]
}

const ListTodo = ({ listTodo }: Props) => {
  const [newTitle, setNewTitle] = useState('')

  const dispatch = useDispatch()

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    item: Todo
  ) => {
    if (event.key === 'Enter') {
      dispatch(capturaNewTitle(newTitle))
      dispatch(editItem(item))
    }
  }

  return (
    <List>
      {listTodo.map((item) => (
        <li key={item.id}>
          <ItemTodo iscompleted={item.isDone}>
            <input
              className="check_completed"
              type="checkbox"
              name="todo_list"
              onClick={() => dispatch(isCompleted(item))}
            />
            {item.isEdit ? (
              <input
                onKeyDown={(e) => handleKeyDown(e, item)}
                onChange={(e) => setNewTitle(e.target.value)}
                defaultValue={item.title}
                className="title_item"
                type="text"
              />
            ) : (
              <label
                className="title_item"
                onDoubleClick={() => dispatch(editItem(item))}
                htmlFor="todo_list"
              >
                {item.title}
              </label>
            )}
            <ButtonDelete onClick={() => dispatch(deleteItem(item))} />
          </ItemTodo>
        </li>
      ))}
    </List>
  )
}

export default ListTodo
