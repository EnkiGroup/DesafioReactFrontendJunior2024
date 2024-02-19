import React, { useState, createRef, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import type {Todo, TodoListType } from '../../../datastructure'
import { recoilState } from '../../../datastructure'

import { Layout } from './style'

interface Props {
  todo: Todo
}

interface State {
  onEdit: boolean
}

const Item: React.FC<Props> = ({ todo }) => {


  const [appState, setAppState] = useRecoilState<TodoListType>(recoilState)
  const editInput = createRef<HTMLInputElement>()
  const init: State = { onEdit: false }
  const [state, setState] = useState(init)

  const onClick = (): void => {
    setState({ onEdit: true })
  }

  const onBlurEdit = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.trim().length > 0) {
      setState({ onEdit: false })
    } else {
      removeItem(todo.id)
    }
  }

  const submitEditText = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      if (e.currentTarget.value.trim().length > 0) {
        setState({ onEdit: false })
      }
    }
  }

  const SwitchStyle = (t: Todo, onEdit: boolean): string => {
    switch (true) {
      case onEdit && t.isDone:
        return 'completed editing'
      case onEdit && !t.isDone:
        return 'editing'
      case !onEdit && t.isDone:
        return 'completed'
      case !onEdit && !t.isDone:
        return ''

      default:
        return ''
    }
  }

  const reverseCompleted = (id: Todo['id']): void => {
    const toggled: TodoListType = appState.map((t) => {
      // search item by name (id)
      if (t.id === id) {
        // change select item status
        return { ...t, isDone: !t.isDone }
        // return other item without any changes
      } else {
        return t
      }
    })

    setAppState( toggled )
  }

  const removeItem = (terminate: Todo['id']): void => {
    const removed: TodoListType = appState.filter(
      (t: Todo): boolean => t.id !== terminate,
    )

    setAppState( removed )
  }

  const handleTodoTextEdit = (e: React.ChangeEvent<HTMLInputElement>, onEdit: Todo['id']): void => {
    const edited = appState.map((t: Todo): Todo => {
      if (t.id === onEdit) {
        return { ...t, title: e.target.value }
      } else {
        return t
      }
    })

    setAppState( edited )
  }

  useEffect(() => {
    // change input text on double click
    if (state.onEdit === true && editInput.current !== null)
      editInput.current.focus()
  }, [editInput, state.onEdit])

  return (
    <Layout data-cy="todo-item">
      <li className={SwitchStyle(todo, state.onEdit)} data-testid="todo-item">
        <div className="view" data-testid="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.isDone}
            onChange={() => reverseCompleted(todo.id)}
            data-cy="todo-item-complete-check"
            data-testid="todo-item-complete-check"
          />

          <label
            onClick={onClick}
            data-cy="todo-body-text"
            data-testid="todo-body-text"
          >
            {todo.title}
          </label>

          <button
            className="destroy"
            onClick={() => removeItem(todo.id)}
            data-cy="delete-todo-btn"
            data-testid="delete-todo-btn"
          />
        </div>
        <input
          ref={editInput}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => onBlurEdit(e)}
          className="edit"
          value={todo.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTodoTextEdit(e, todo.id)} 
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => submitEditText(e)}
          data-cy="todo-edit-input"
          data-testid="todo-edit-input"
        />
      </li>
    </Layout>
    
  )
}


export default Item
