import React, { useEffect, useState } from 'react'
import './index.scss'
import { useAtom } from 'jotai'
import { toDoListAtom } from '../../../states/toDoListAtom'
import Task from '../../atoms/Task/Task'
import { Tasks, ToDoProps } from '../../../@types'
import { fetchTasks } from '../../../api/tasks.service'

const ToDo: React.FC<ToDoProps> = ({isSecondBoxVisible, setIsSecondBoxVisible}) => {
  const [todoList, setTodoList] = useAtom(toDoListAtom)

  useEffect(() => {
    const fetchAndSetTasks = async () => {
      try {
        const tasks = await fetchTasks()
        if (tasks) setTodoList(tasks)
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error)
      }
    }
    fetchAndSetTasks()
  }, [])
  
  const handleAddTask = (newTask: Tasks) => {
    if (newTask && !todoList.includes(newTask)) setTodoList([...todoList, newTask])
  }

  const handleRemoveTask = (id: string) => {
      setTodoList(todoList.filter((task) => task.id !== id))      
  }

  useEffect(() => {
    if (todoList.length === 0) {
      setIsSecondBoxVisible(false);
    }
  }, [todoList, isSecondBoxVisible])

  useEffect(() => {
  }, [todoList])

  const sortedTodoList = [...todoList].reverse()
  const taskCount = todoList.length

  return (
    <section className='toDoListContainer'>
      {sortedTodoList.length > 0 ? sortedTodoList.map((task, index) => ( 
          <Task 
            key={index} 
            index={index}
            id={task.id}
            title={task.title}
            isDone={task.isDone}
            onRemove={handleRemoveTask}
            onChange={(event) => handleAddTask(event.target.value)}
          />
      )) : null}
      <div className='divisor'></div>
      <div className='toDoListContainer__toDoBox2nd' style={{display: isSecondBoxVisible ? 'flex' : 'none'}}>
        <h3 className='toDoListContainer__toDoBox2nd--count'>
          {taskCount} item{taskCount === 1 ? '' : 's'} left!
        </h3>
        <nav className='toDoListContainer__toDoBox2nd--nav'>
          <ul>
            <li>All</li>
            <li>Active</li>
            <li>Completed</li>
          </ul>
        </nav>
        <a className='toDoListContainer__toDoBox2nd--clearLink' href="#">Clear completed</a>
      </div>
    </section>
  )
}

export default ToDo