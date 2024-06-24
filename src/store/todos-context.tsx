import { createContext, useContext, useReducer, useState } from 'react'
import { TodosContextProviderProps } from '../types/TodosContextProviderProps';
import { TodosState } from '../types/TodosState';
import { TodosContextValue } from '../types/TodosContextValue';
import { Action } from '../types/actions/Action';
import { handleAddTodo } from '../types/actions/AddTodoAction';
import { handleDeleteTodo } from '../types/actions/DeleteTodoAction';
import { handleClearCompleted } from '../types/actions/ClearCompletedeAction';
import { handleSetAllCompleted } from '../types/actions/SetAllCompletedAction';
import { handleToggleActive } from '../types/actions/ToggleActiveAction';
import { handleUpdateDescription } from '../types/actions/UpdateDescriptionAction';

const TodosContext = createContext<TodosContextValue | null >({ 
    todos: [], 
    handleAddTodo: () => {},
    handleDeleteTodo: () => {},
    handleClearCompleted: () => {},
    handleSetAllCompleted: () => {},
    handleToggleActive: () => {},
    handleUpdateDescription: () => {}
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
    if (action.type === 'CLEAR_COMPLETED') {
        return handleClearCompleted(state);
    }
    if (action.type === 'SET_ALL_COMPLETED') {
        return handleSetAllCompleted(state)
    }
    if (action.type === 'TOGGLE_ACTIVE') {
        return handleToggleActive(state, action.id)
    }
    if (action.type === 'UPDATE_DESCRIPTION') {
        return handleUpdateDescription(state, action.id, action.newDescription)
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
        handleClearCompleted() {
            dispatch({type: 'CLEAR_COMPLETED'})
        },
        handleSetAllCompleted() {
            dispatch({type: 'SET_ALL_COMPLETED'})
        },
        handleToggleActive(id: number) {
            dispatch({type: 'TOGGLE_ACTIVE', id: id})
        },
        handleUpdateDescription(id: number, newDescription: string) {
            dispatch({type: 'UPDATE_DESCRIPTION', id: id, newDescription: newDescription})
        }
    }

    return <TodosContext.Provider value={ ctx }>{ children }</TodosContext.Provider>
}