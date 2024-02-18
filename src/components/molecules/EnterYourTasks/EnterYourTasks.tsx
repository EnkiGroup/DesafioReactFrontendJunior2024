import React, { useEffect, useRef, useState } from 'react'
import { EnterYourTasksProps, Tasks } from '../../../@types'
import { useAtom  } from 'jotai'
import { toDoListAtom } from '../../../states/toDoListAtom'

const EnterYourTasks: React.FC<EnterYourTasksProps> = ({ isFocused, inputRef, handleChangeFocus, setSecondBoxVisibility }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const inputContainerRef = useRef<HTMLDivElement>(null)
  const [todoList, setTodoList] = useAtom(toDoListAtom)
  const [isImageVisible, setIsImageVisible] = useState<boolean>(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputContainerRef.current && !inputContainerRef.current.contains(event.target as Node)) {
        setIsButtonClicked(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)    
  }, [])

  const handleClick = () => {
    setIsButtonClicked(true)
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      const newTask = event.currentTarget.value.trim()

      const taskFiltered = todoList.some((element) => element.title === newTask)
      
      if (newTask && !taskFiltered) {

        const createdNewTask = {
          id: Math.random().toString(36).slice(2, 10),
          title: newTask,
          isDone: false,
        }
        setTodoList([...todoList, createdNewTask ])
        event.currentTarget.value = ''
      } 
      else alert('Tarefa vazia ou duplicada!') 
      setIsImageVisible(true)
      setSecondBoxVisibility(true)
    }
  }

  useEffect(() => {
    const handleCheckTasksCount = () => {
      if (todoList.length === 0) {
        setIsImageVisible(false)
      }
    }

    handleCheckTasksCount()
  }, [todoList])
  
  return (
    <div className={`toDoContainer__box1st ${isFocused ? 'isFocus' : ''}`}>
      <div ref={inputContainerRef} className={`inputContainer ${isButtonClicked ? 'isFocus' : ''}`}>
        <img 
          className={`inputContainer__buttonDown ${isButtonClicked ? 'isBrightness' : ''}`}
          src="/imgs/down.png" 
          alt="Button to complete all tasks"  
          style={{display: isImageVisible ? 'block' : 'none'}}
          aria-label='Button to complete all tasks'
          onClick={handleClick}
        />
      </div>
      <input
        ref={inputRef}
        onFocus={handleChangeFocus}
        className='toDoContainer__box1st--input'
        type="text" 
        placeholder='Whats needs to be done?'
        onKeyDown={handleKeyPress}
      />
    </div>
  )
}

export default EnterYourTasks