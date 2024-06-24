import { createContext, useContext, useReducer, useState } from 'react'
import { TodosContextProviderProps } from '../types/TodosContextProviderProps';
import { TodosState } from '../types/TodosState';
import { TodosContextValue } from '../types/TodosContextValue';
import { Action } from '../types/actions/Action';
import { Todo } from '../types/Todo';
import { handleAddTodo } from '../types/actions/AddTodoAction';
import { handleDeleteTodo } from '../types/actions/DeleteTodoAction';

const TodosContext = createContext<TodosContextValue | null >({ 
    todos: [], 
    handleAddTodo: () => {},
    handleDeleteTodo: () => {} 
});

export function useTodosContext() {
    const todosCtx = useContext(TodosContext)
    if (todosCtx === null) {
        throw new Error('Todos Context is null')
    } 
    return todosCtx
}

const initialState: TodosState = {
    todos: [],
  };

function todosReducer(state: TodosState, action: Action): TodosState {
    if (action.type === 'ADD_TODO') {
        return handleAddTodo(state, action.description);
    } 
    if (action.type === 'DELETE_TODO') {
        return handleDeleteTodo(state, action.id);
    }

    return state;
}

export default function TodosContextProvider({ children }: TodosContextProviderProps) {
    const [todoState, dispatch] = useReducer(todosReducer, initialState)

    const ctx: TodosContextValue = {
        todos: todoState.todos,
        handleAddTodo(description: string) {
            dispatch({type: "ADD_TODO", description: description})
        },
        handleDeleteTodo(id: number) {
            dispatch({type: 'DELETE_TODO', id: id})
        },
    }

    return <TodosContext.Provider value={ ctx }>{ children }</TodosContext.Provider>
}