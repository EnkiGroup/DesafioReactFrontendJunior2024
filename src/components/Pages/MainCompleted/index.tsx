import { useSelector } from 'react-redux'

import { MainContain } from '../../Main/style'

import Todo from '../../Todo'

import { RootReducer } from '../../../store'

const MainCompleted = () => {
  const { listTodo } = useSelector((s: RootReducer) => s.reducers)

  const filterCompleted = listTodo.filter((item) => item.isDone === true)

  return (
    <MainContain>
      <Todo listTodo={filterCompleted} />
    </MainContain>
  )
}

export default MainCompleted
