 import { fireEvent, screen } from '@testing-library/react'
 import React from 'react'
 import { useRecoilState } from 'recoil'

 import type {TodoListType } from '../../../datastructure'
 import { recoilState } from '../../../datastructure'
 import { TestRenderer } from '../../../test'

 import Item from './index'

 const initialRecoilState: TodoListType =
    [
     {
       id: '8EWwf4FAScSF',
       title: 'what is love?', //baby don't hurt me
       isDone: false,
     },
   ]


 const App = () => {
   const [appState] = useRecoilState<TodoListType>(recoilState)
   if (appState.length === 0) return null
   return (
     <div>
       <Item todo={appState[0]} />
     </div>
   )
 }

 test('should each initialAppstate todo object value is set to Item element', () => {
   TestRenderer(
     <Item todo={initialRecoilState[0]} />,
     initialRecoilState,
   )

   expect(screen.getByTestId('todo-item')).toBeInTheDocument()

   expect(
     (screen.getByTestId('todo-item-complete-check') as HTMLInputElement)
       .checked,
   ).toBe(false)
   expect(screen.getByTestId('todo-body-text')).toHaveTextContent('what is love?')
   expect(
     (screen.getByTestId('todo-edit-input') as HTMLInputElement).value,
   ).toBe('what is love?')
 })

 test('set css class changes', () => {
   TestRenderer(<App />, initialRecoilState)

   // completed and Onedit selectors
   expect(screen.getByTestId('todo-item')).not.toHaveClass('Completed')
   expect(screen.getByTestId('todo-item')).not.toHaveClass('editing')
 })

 test('todo complete checkbox', () => {
   TestRenderer(<App />, initialRecoilState)

   //checkbox
   fireEvent.click(screen.getByTestId('todo-item-complete-check'))
   expect(
     (screen.getByTestId('todo-item-complete-check') as HTMLInputElement)
       .checked,
   ).toBe(true)
   expect(screen.getByTestId('todo-item')).toHaveClass('completed')

   // toggle
   fireEvent.click(screen.getByTestId('todo-item-complete-check'))
   expect(
     (screen.getByTestId('todo-item-complete-check') as HTMLInputElement)
       .checked,
   ).toBe(false)
   expect(screen.getByTestId('todo-item')).not.toHaveClass('completed')
 })

 test('show edit toggle show/hide', () => {
   TestRenderer(<App />, initialRecoilState)

   fireEvent.click(screen.getByTestId('todo-body-text'))
   expect(screen.getByTestId('todo-item')).toHaveClass('editing')
   expect(screen.getByTestId('todo-edit-input')).toBeVisible()
   expect(screen.getByTestId('todo-edit-input')).toHaveFocus()
   fireEvent.change(screen.getByTestId('todo-edit-input'), {
     target: { value: 'what is love?' },
   })
   fireEvent.keyDown(screen.getByTestId('todo-edit-input'), { key: 'Enter' })

   expect(screen.getByTestId('todo-body-text')).toHaveTextContent(
     'what is love?',
   )
   expect(screen.getByTestId('todo-item')).not.toHaveClass('editing')

   fireEvent.click(screen.getByTestId('todo-body-text'))
   expect(screen.getByTestId('todo-item')).toHaveClass('editing')
   expect(screen.getByTestId('todo-edit-input')).toBeVisible()
   expect(screen.getByTestId('todo-edit-input')).toHaveFocus()
   fireEvent.change(screen.getByTestId('todo-edit-input'), {
     target: { value: 'what is love? plus' },
   })
   fireEvent.keyDown(screen.getByTestId('todo-edit-input'), { key: 'Escape' })
   expect(screen.getByTestId('todo-body-text')).toHaveTextContent(
     'what is love? plus',
   )
   expect(screen.getByTestId('todo-item')).not.toHaveClass('editing')
 })

 test('delete todo item', () => {
   TestRenderer(<App />, initialRecoilState)

   expect(screen.getByTestId('todo-item')).toBeInTheDocument()
   fireEvent.click(screen.getByTestId('delete-todo-btn'))
   expect(screen.queryByTestId('todo-item')).toBe(null)
 })

export{}