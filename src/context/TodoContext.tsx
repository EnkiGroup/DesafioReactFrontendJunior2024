import { createContext, useContext, useState } from "react";
import { Todo } from "../types/Todo";

export const TodoContext = createContext({
    todos: [] as Todo[],
    setTodos: (todos: Todo[]) => { },
    addTodo: (todo: Todo) => { },
    toggleTodo: (id: string) => { }
    });

export const TodoProvider = ({ children }: any) => {

    const [todos, setTodos] = useState<Todo[]>([] as Todo[]);

    const addTodo = (todo: Todo) => {
        setTodos([...todos, todo]);
        console.log(todos);
    }

     const toggleTodo = (id: string) => {
       setTodos(
         todos.map((todo) => {
           if (todo.id === id) {
             return {
               ...todo,
               isDone: !todo.isDone,
             };
           }
           return todo;
         })
       );
       console.log(todos);
     };

    const getTodos = () => {
        return todos;
    }

    return (
        <TodoContext.Provider value={{ todos, setTodos, addTodo, toggleTodo}}>
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

