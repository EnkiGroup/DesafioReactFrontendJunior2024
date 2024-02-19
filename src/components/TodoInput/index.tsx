import React, { createRef} from 'react';
import { useRecoilState } from 'recoil';
import type {  Todo, TodoListType } from '../../datastructure';
import { recoilState } from '../../datastructure';
import { UUID } from '../../functions';
import { Layout } from './style' ;


const NewTodoTextInput: React.FC = () => {
  const [appState, setAppState] = useRecoilState<TodoListType>(recoilState)
  const textInput: React.RefObject<HTMLInputElement> =
    createRef<HTMLInputElement>()
  

  function addTodo(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (textInput.current === null) return 
    if (e.key === 'Enter' && textInput.current.value.trim().length > 0) {
      // make new todo object
      const todo: Todo = {
        id: UUID(),
        title: textInput.current.value,
        isDone: false,
      }

      // add new todo to entire TodoList
      setAppState( [todo, ...appState])

      // reset text input UI value
      textInput.current.value = ''
    }
  }
  
  return (
    <Layout>
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          ref={textInput}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => addTodo(e)}
          data-testid="new-todo-input-text"
          data-cy="new-todo-input-text"
          autoFocus
        />
      </header>
    </Layout>
  )
}

export default NewTodoTextInput
