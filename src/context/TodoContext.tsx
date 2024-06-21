import { createContext, useContext, useState } from "react";
import { Todo } from "../types/Todo";

export const TodoContext = createContext({
    todos: [] as Todo[],
    setTodos: (todos: Todo[]) => { },
    addTodo: (todo: Todo) => { }
    });

export const TodoProvider = ({ children }: any) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (todo: Todo) => {
        setTodos([...todos, todo]);
        console.log(todos);
    }

    return (
        <TodoContext.Provider value={{ todos, setTodos, addTodo}}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
    throw new Error("useTodo deve ser utilizado em um TodoProvider");
    }
    return context;
}

