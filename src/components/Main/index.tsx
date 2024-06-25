import { useSelector } from 'react-redux'

import Todo from '../Todo'

import { MainContain } from './style'

import { RootReducer } from '../../store'

const Main = () => {
  const { listTodo } = useSelector((s: RootReducer) => s.reducers)

  return (
    <MainContain>
      <Todo listTodo={listTodo} />
    </MainContain>
  )
}

export default Main
