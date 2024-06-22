import { createContext, useContext, useMemo, useState } from "react";
import { Todo } from "../types/Todo";

/* 
Como o nome sugere, o TodoContext é o contexto que irá armazenar os todos. Ele é criado com createContext e exportado para ser utilizado em outros componentes.
Esta prática é muito comum em aplicações React, pois permite que os dados sejam compartilhados entre componentes sem a necessidade de passar props manualmente.
Entretanto, é importante ressaltar que o uso de contextos deve ser feito com moderação, pois pode tornar o código mais complexo e difícil de entender.
*/

export const TodoContext = createContext({
    todos: [] as Todo[],
    setTodos: (todos: Todo[]) => { },
    addTodo: (todo: Todo) => { },
    toggleTodo: (id: string) => { },
    updateTodo: (todo: Todo) => { }
    });

export const TodoProvider = ({ children }: any) => {

  //Puxa os todos da API, e os seta no estado, utilizando o useMemo para garantir que a função seja chamada apenas uma vez
  useMemo(() => {
  const fetchTodos = async () => {
    const response = await fetch('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos');
    const data = await response.json();
    setTodos(data);
    }
    fetchTodos();
  },[]);
  
    const [todos, setTodos] = useState<Todo[]>([] as Todo[]);

  //Adiciona um novo todo ao array de todos
    const addTodo = (todo: Todo) => {
        setTodos([...todos, todo]);
    }

    //Altera o estado de isDone de um todo
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
     };
     
  
  //Atualiza um todo no array de todos
  const updateTodo = (todo: Todo) => {
    setTodos(
      todos.map((oldTodo) => {
        if (oldTodo.id === todo.id) {
          return todo;
        }
        return todo;
      })
    );
  }

    return (
        <TodoContext.Provider value={{ todos, setTodos, addTodo, updateTodo, toggleTodo}}>
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

