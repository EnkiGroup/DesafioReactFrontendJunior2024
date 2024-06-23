import { ReactNode, createContext, useContext } from 'react'
import { InputProps } from '../types/InputProps';
import { TodosContextProviderProps } from '../types/TodosContextProviderProps';

const TodosContext = createContext<InputProps | null >(null);

export function useTodosContext() {
    const todosCtx = useContext(TodosContext)
    if (todosCtx === null) {
        throw new Error('Todos Context is null')
    } 
    return todosCtx
}

export default function TodosContextProvider({ children }: TodosContextProviderProps) {
    const ctx: InputProps = {
        handleAddTodo(description) {
            
        },
        handleSetAllCompleted() {
            
        },
    }
    return <TodosContext.Provider value={ ctx }>{ children }</TodosContext.Provider>
}