 import { fireEvent } from '@testing-library/react'
 import React from 'react'

 import type { TodoListType } from '../../datastructure'
 import { TestRenderer } from '../../test'

 import TodoList from './index'

 const initialRecoilState: TodoListType = 
   [
     {
       id: '2HR51S2shbr',
       title: 'take me in your arms',
       isDone: true,
     },
     {
       id: 'F21efg1eG2g',
       title: 'dont you let me go',
       isDone: false,
     },
     {
       id: 'JHM18nv86en',
       title: 'i need you more and more',
       isDone: false,
     },
   ]


 test('should render all itens', () => {
   const screen = TestRenderer(<TodoList />, initialRecoilState)

   expect(screen.getByTestId('todo-list')).toBeInTheDocument()
   expect(screen.getByTestId('todo-list').children.length).toBe(3)
   expect(Array.isArray(screen.getAllByTestId('todo-item'))).toBe(true)
   expect(screen.getAllByTestId('todo-item')[0]).toHaveTextContent('take me in your arms')
   expect(screen.getAllByTestId('todo-item')[1]).toHaveTextContent('dont you let me go')
   expect(screen.getAllByTestId('todo-item')[2]).toHaveTextContent('i need you more and more')
 })

 test('should delete todo buton', () => {
   const screen = TestRenderer(<TodoList />, initialRecoilState)


   fireEvent.click(screen.getAllByTestId('delete-todo-btn')[0])

   expect(screen.getByTestId('todo-list').children.length).toBe(2)
   expect(Array.isArray(screen.getAllByTestId('todo-item'))).toBe(true)
   expect(screen.getAllByTestId('todo-item')[0]).toHaveTextContent('dont you let me go')
   expect(screen.getAllByTestId('todo-item')[1]).toHaveTextContent('i need you more and more')
 })

 test('should work all completed:true|false checkbox toggle button', () => {
   const screen = TestRenderer(<TodoList />, initialRecoilState)


   fireEvent.click(screen.getByTestId('toggle-all-btn'))
   expect((screen.getAllByTestId('todo-item-complete-check')[0] as HTMLInputElement).checked).toBe(true) 
   expect((screen.getAllByTestId('todo-item-complete-check')[1] as HTMLInputElement).checked).toBe(true) 
   expect((screen.getAllByTestId('todo-item-complete-check')[2] as HTMLInputElement).checked).toBe(true) 


   fireEvent.click(screen.getByTestId('toggle-all-btn'))
   expect((screen.getAllByTestId('todo-item-complete-check')[0] as HTMLInputElement).checked).toBe(false) 
   expect((screen.getAllByTestId('todo-item-complete-check')[1] as HTMLInputElement).checked).toBe(false) 
   expect((screen.getAllByTestId('todo-item-complete-check')[2] as HTMLInputElement).checked).toBe(false) 
 })

export {}
