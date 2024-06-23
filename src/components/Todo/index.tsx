import Input from '../Ui/Input'
import ToggleButton from '../Ui/ToggleButton'
import ListTodo from '../Ui/ListTodo'
import FooterList from '../Ui/FooterList'

import { TodoCotain } from './style'

const Todo = () => {
  return (
    <TodoCotain>
      <Input />
      <ToggleButton />
      <ListTodo />
      <FooterList />
    </TodoCotain>
  )
}

export default Todo
