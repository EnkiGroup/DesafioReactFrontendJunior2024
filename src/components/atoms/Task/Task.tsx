import React, { useEffect, useState } from 'react'
import { Tasks, TasksProps } from '../../../@types'
import '../../molecules/ToDo/index.scss'
import { toDoListAtom } from '../../../states/toDoListAtom';
import { useAtom } from 'jotai';

const Task: React.FC<TasksProps> = ({ 
  id,
  title,
  isDone,
  onRemove,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false)
  const [isHoverImage, setIsHoverImage] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(isDone)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [todoList, setTodoList] = useAtom<Tasks[]>(toDoListAtom)
  
  useEffect(() => {
    console.log(todoList)
  }, [])

  const handleHover = (hover: boolean) => {
    setIsHover(hover)
  }

  const handleHoverImage = (hover: boolean) => {
    setIsHoverImage(hover)
  }
    
  const handleClickCircle = () => {
    setIsChecked(!isChecked)
  }

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
  }

  const handleRemove = () => {
    onRemove(id)
  }

  // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     const currentValue = event.currentTarget.value
  //     setTodoList(todoList.map((task) =>
  //     task.id === id ? { ...task, title: currentValue } : task
  //   ))
  //     setIsEditing(false)
  //   }
  // }
    
  return (
    <div className={`toDoListContainer__toDoBox1st ${isEditing ? 'editing' : ''}`} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
      <div className="divCircle">
        <img
          onClick={handleClickCircle}
          className="divCircle__imgCircle"
          src={isChecked ? '/imgs/checked.png' : '/imgs/circle.png'}
          alt="Button to complete task"
          aria-label="Button to complete task"
          style={{ display: isEditing ? 'none' : 'block' }}
        />
      </div>
          {isEditing ? (
            <input
              type="text"
              defaultValue={title}
              onBlur={handleBlur}
              // onChange={todoList.map((task) =>
              //   task.id === id ? { ...task, title: event.currentTarget.value } : task
              // )}
              className='toDoListContainer__toDoBox1st--input' 
              // onKeyDown={handleKeyPress}
            />
          ) : (
            <div className={`toDoListContainer__toDoBox1st--inputDiv ${isChecked ? 'checked' : ''}`} onDoubleClick={handleDoubleClick}>
              {title}
            </div>
          )}
          <img
            className="toDoListContainer__toDoBox1st--imgCross"
            src={isHoverImage ? '/imgs/xRed.png' : '/imgs/x.png'}
            style={{ display: isHover && !isChecked && !isEditing ? 'block' : 'none' }}
            onMouseEnter={() => handleHoverImage(true)}
            onMouseLeave={() => handleHoverImage(false)}
            alt="Button to remove task"
            aria-label="Button to remove task"
            onClick={handleRemove}
          />
    </div>
  );
};

export default Task