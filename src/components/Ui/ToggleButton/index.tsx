import { useDispatch, useSelector } from 'react-redux'

import { InputCheck, LabelCheck, Toggle } from './style'

import { RootReducer } from '../../../store'
import { allCompleted } from '../../../store/reducer/reducerStates'

const ToggleButton = () => {
  const { listTodo } = useSelector((s: RootReducer) => s.reducers)

  const dispatch = useDispatch()

  return (
    <>
      {listTodo.length > 0 && (
        <Toggle>
          <InputCheck type="checkbox" name="toogle-all" />
          <LabelCheck
            onClick={() => dispatch(allCompleted())}
            htmlFor="toogle-all"
          >
            Toggle All Input
          </LabelCheck>
        </Toggle>
      )}
    </>
  )
}

export default ToggleButton
