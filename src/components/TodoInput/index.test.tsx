import { fireEvent } from '@testing-library/react'
import React from 'react'

import { TestRenderer } from '../../test'

import NewTodoTextInput from './index'

test('render <TodoTextInput/>', () => {
  const screen = TestRenderer(<NewTodoTextInput />)
  const input = screen.getByTestId('new-todo-input-text') as HTMLInputElement


  expect(screen.getByText('todos')).toBeInTheDocument()


  expect(
    screen.getByPlaceholderText('What needs to be done?'),
  ).toBeInTheDocument()


  fireEvent.change(input, {
    target: { value: 'Cleaning out my closet' }, //eminem - cleaning out my closet
  })


  expect(input.value).toBe('Cleaning out my closet') //eminem - cleaning out my closet


  fireEvent.keyPress(input, {
    charCode: 13,
    code: 13,
    key: 'Enter',
  })

  // text clear
  expect(input.value).toBe('')
})

