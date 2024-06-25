import { createContext, useContext, useEffect, useReducer } from 'react'
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
import { useTodosFetch } from '../hooks/useTodosFetch'
import { handleSetInitialTodos } from '../types/actions/SetInitialTodosAction';

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



function todosReducer(state: TodosState, action: Action): TodosState {
    if (action.type === 'ADD_TODO') {
        return handleAddTodo(state, action.title);
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
        return handleUpdateDescription(state, action.id, action.newTitle)
    }
    if (action.type === 'SET_INITIAL_TODOS') {
        return handleSetInitialTodos(state, action.todos)
    }

    return state;
}

export default function TodosContextProvider({ children }: TodosContextProviderProps) {
    const url: string = "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos"
    const [todoState, dispatch] = useReducer(todosReducer, {todos: []})
    const { data } = useTodosFetch(url)

    useEffect(() => {
        if (data) {
            dispatch({ type: 'SET_INITIAL_TODOS', todos: data });
        }
    }, [data]);

    const ctx: TodosContextValue = {
        todos: todoState.todos,
        handleAddTodo(title: string) {
            dispatch({type: "ADD_TODO", title: title})
        },
        handleDeleteTodo(id: string) {
            dispatch({type: 'DELETE_TODO', id: id})
        },
        handleClearCompleted() {
            dispatch({type: 'CLEAR_COMPLETED'})
        },
        handleSetAllCompleted() {
            dispatch({type: 'SET_ALL_COMPLETED'})
        },
        handleToggleActive(id: string) {
            dispatch({type: 'TOGGLE_ACTIVE', id: id})
        },
        handleUpdateDescription(id: string, newTitle: string) {
            dispatch({type: 'UPDATE_DESCRIPTION', id: id, newTitle: newTitle})
        }
    }

    return <TodosContext.Provider value={ ctx }>{ children }</TodosContext.Provider>
}

