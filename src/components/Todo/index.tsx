import Input from '../Ui/Input'
import ToggleButton from '../Ui/ToggleButton'
import ListTodo from '../Ui/ListTodo'
import FooterList from '../Ui/FooterList'

import { TodoCotain } from './style'

import { Todo as TodoList } from '../../store/reducer/reducerStates'

type Props = {
  listTodo: TodoList[]
}

const Todo = ({ listTodo }: Props) => {
  return (
    <TodoCotain>
      <Input />
      <ToggleButton />
      <ListTodo listTodo={listTodo} />
      <FooterList />
    </TodoCotain>
  )
}

export default Todo
