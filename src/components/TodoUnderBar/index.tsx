import React from 'react'
import { useRecoilState } from 'recoil'

import type { Todo, TodoListType } from '../../datastructure'
import { recoilState } from '../../datastructure'

import FilterLink from './FilterLink'
import { Layout } from './style'

const UnderBar: React.FC = () => {
  const [appState, setAppState] = useRecoilState<TodoListType>(recoilState)
  const completed: number = appState.filter(t => t.isDone === true).length 
  const backlog: number = appState.filter(t => t.isDone === false).length 

  function clearCompleted(): void {
    setAppState(
      appState.filter((t: Todo) => !t.isDone),
    )
    
  }
 

  return (
    <Layout>
      <footer className="footer">
        <span className="todo-count">
          <strong data-cy="remaining-unisDone-todo-count">{backlog}</strong>{' '}
          item left
        </span>
        <FilterLink />

        {completed > 0 && (
          <button
            onClick={clearCompleted}
            className="clear-completed"
            data-cy="clear-completed-button"
          >
            Clear completed
          </button>
        )}
      </footer>
    </Layout>
  )
}

export default UnderBar
