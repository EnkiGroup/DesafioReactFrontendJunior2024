import { useSelector } from 'react-redux'

import { MainContain } from '../../Main/style'

import Todo from '../../Todo'

import { RootReducer } from '../../../store'

const MainActive = () => {
  const { listTodo } = useSelector((s: RootReducer) => s.reducers)

  const filterActive = listTodo.filter((item) => item.isDone === false)

  return (
    <MainContain>
      <Todo listTodo={filterActive} />
    </MainContain>
  )
}

export default MainActive
