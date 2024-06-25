import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { InputTodo } from './style'

import { addTodo } from '../../../store/reducer/reducerStates'
const Input = () => {
  const [textTodo, setTextTodo] = useState('')

  const dispatch = useDispatch()

  const handleCapturar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextTodo(e.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(addTodo(textTodo))
      setTextTodo('')
    }
  }

  return (
    <>
      <InputTodo
        onChange={(e) => handleCapturar(e)}
        onKeyDown={(e) => handleKeyDown(e)}
        value={textTodo}
        type="text"
        placeholder="What needs to be done?"
      />
    </>
  )
}

export default Input
