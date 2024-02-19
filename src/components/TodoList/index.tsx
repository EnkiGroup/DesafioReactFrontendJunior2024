import type { ReactElement } from "react";
import React from "react";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import type {  Todo, TodoListType } from "../../datastructure";
import { recoilState } from "../../datastructure";
import Item from "./Items";
import { Layout } from "./style";




const TodoList: React.FC =()=>{
    const[appState, setAppState] = useRecoilState<TodoListType>(recoilState)
    const {pathname} = useLocation()
    function toggleAllCheckbox(e: React.ChangeEvent<HTMLInputElement>):void {
        setAppState(appState.map((t: Todo): Todo=>({...t,isDone: e.target.checked})))
    }
    

    return (
        <Layout>
          <section className="main">
            <input
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
              onChange={toggleAllCheckbox}
              data-cy="toggle-all-btn"
              data-testid="toggle-all-btn"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list" data-testid="todo-list">
              {appState
                .filter((t: Todo): boolean => {
                  switch (pathname) {
                    case '/':
                      return true
                    case '/active':
                      return t.isDone === false
                    case '/completed':
                      return t.isDone === true
                    default:
                      return true
                  }
                })
                .map((t: Todo): ReactElement => {
                  return <Item key={t.id} todo={t} />
                })}
            </ul>
          </section>
        </Layout>
      )
}
export default TodoList