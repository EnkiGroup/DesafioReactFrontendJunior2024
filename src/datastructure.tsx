
import type { RecoilState, } from 'recoil';
import { atom } from 'recoil';



export interface Todo {
    id: string
    title: string
    isDone: boolean
  }

  export type TodoListType = Todo[]

  
  export interface AppState {
    todoList: TodoListType 
  }
  
  export enum LocalStorageKey {
    APP_STATE = 'APP_STATE',
  }
  
  function LoadAppStateFromLocalStorage(): TodoListType {
     const stringifiedJSON: string | null = window.localStorage.getItem(
       LocalStorageKey.APP_STATE,
     )
     if (stringifiedJSON !== undefined && typeof stringifiedJSON === 'string') {
       const Loaded:  TodoListType = JSON.parse(stringifiedJSON)
       return Loaded
     }

    
  
     const BlankAppState: TodoListType = []
     return BlankAppState
   }

  // function LoadAppStateFromLocalStorage(): TodoListType {
  //   const stringifiedJSON: string | null = window.localStorage.getItem(LocalStorageKey.APP_STATE);
  
  //   if ( stringifiedJSON !== undefined && typeof stringifiedJSON === 'string' && stringifiedJSON !== '') {
  //     return JSON.parse(stringifiedJSON);
  //   }
  
  //   return [];
  // }
  
  export const recoilState: RecoilState<TodoListType> = atom({
    default: LoadAppStateFromLocalStorage(),
    key: 'initialAppState',
  });


