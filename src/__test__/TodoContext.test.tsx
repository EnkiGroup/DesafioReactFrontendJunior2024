import { renderHook } from '@testing-library/react-hooks';
import { TodoProvider, useTodo } from '../context/TodoContext';
import { BrowserRouter } from 'react-router-dom';

describe('TodoContext Tests', () => {

    //Adicionando dados de teste
    const sampleTodos = [
        {
            id: '1',
            title: 'Teste de Todo',
            isDone: false,
        },
        {
            id: '2',
            title: 'Teste de Todo 2',
            isDone: true,
        },
    ];

    it('should add a new todo', () => {
        
        const { result } = renderHook(() => useTodo(), {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <TodoProvider>{children}</TodoProvider>
                </BrowserRouter>
            )
        });

        // Adicionando um novo Todo
        result.current.addTodo(sampleTodos[0]);
        expect(result.current.todos).toContainEqual(sampleTodos[0]);
        }
    )
    
    it('should update a todo', () => {
        
        const { result } = renderHook(() => useTodo(), {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <TodoProvider>{children}</TodoProvider>
                </BrowserRouter>
            )
        });

        // Adicionando um novo Todo
        result.current.addTodo(sampleTodos[0]);

        // Atualizando o Todo
        const updatedTodo = {
          ...sampleTodos[0],
          isDone: true,
        };
        result.current.updateTodo(updatedTodo);
        expect(result.current.todos).toContainEqual(updatedTodo);
    })

    it('should remove a todo', () => {
        const { result } = renderHook(() => useTodo(), {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <TodoProvider>{children}</TodoProvider>
                </BrowserRouter>
            )
        });

        // Adicionando um novo Todo
        result.current.addTodo(sampleTodos[0]);

        // Removendo o Todo
        result.current.removeTodo(sampleTodos[0].id);
        expect(result.current.todos).not.toContainEqual(sampleTodos[0]);
    })

    it('should toggle all todos', () => {
        const { result } = renderHook(() => useTodo(), {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <TodoProvider>{children}</TodoProvider>
                </BrowserRouter>
            )
        });

        // Adicionando dois novos Todos
        result.current.addTodo(sampleTodos[0]);
        result.current.addTodo(sampleTodos[1]);

        // Alternando os todos para true
        result.current.toggleAllTodos();
        expect(result.current.todos).toEqual([
            { ...sampleTodos[0], isDone: true },
            { ...sampleTodos[1], isDone: true },
        ]);
    })

    it('should clear all done todos', () => {
        const { result } = renderHook(() => useTodo(), {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <TodoProvider>{children}</TodoProvider>
                </BrowserRouter>
            )
        });

        // Adicionando dois novos Todos
        result.current.addTodo(sampleTodos[0]);
        result.current.addTodo(sampleTodos[1]);

        // Limpando os todos
        result.current.removeDoneTodos();
        expect(result.current.todos).toEqual([sampleTodos[0]]);
    })

    it('should return the number of remaining todos', () => {
        const { result } = renderHook(() => useTodo(), {
            wrapper: ({ children }) => (
                <BrowserRouter>
                    <TodoProvider>{children}</TodoProvider>
                </BrowserRouter>
            )
        });

        // Adicionando dois novos Todos
        result.current.addTodo(sampleTodos[0]);
        result.current.addTodo(sampleTodos[1]);

        // Verificando a quantidade de todos a serem feitos
        expect(result.current.getRemainingTodos()).toBe(1);
    })
});
