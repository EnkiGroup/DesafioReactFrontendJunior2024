import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { renderHook } from "@testing-library/react-hooks";
import { TodoProvider, useTodo } from "../context/TodoContext";
import { Todo } from "../types/Todo";

describe("TodoContext filter utils", () => {
  const sampleTodos: Todo[] = [
    {
      id: "1",
      title: "Teste de Todo",
      isDone: false,
    },
    {
      id: "2",
      title: "Teste de Todo 2",
      isDone: true,
    },
    {
      id: "3",
      title: "Teste de Todo 3",
      isDone: false,
    },
    {
      id: "4",
      title: "Teste de Todo 4",
      isDone: true,
    },
  ];

  it("should filter active todos when location.pathname is /active", () => {
    const useTestLocation = () => {
      const location = useLocation();
      location.pathname = "/active";
      return location;
    };

    const { result } = renderHook(
      () => {
        const location = useTestLocation();
        return useTodo();
      },
      {
        wrapper: ({ children }) => (
          <BrowserRouter>
            <TodoProvider>{children}</TodoProvider>
          </BrowserRouter>
        ),
      }
    );

    const filteredTodos = result.current.filterTodos(
      sampleTodos,
      "/active" 
    );

    const expectedTodos = [sampleTodos[0], sampleTodos[2]];

    expect(filteredTodos).toEqual(expectedTodos); 
  });
    
    it("should filter completed todos when location.pathname is /completed", () => {
        const useTestLocation = () => {
        const location = useLocation();
        location.pathname = "/completed";
        return location;
        };
    
        const { result } = renderHook(
        () => {
            const location = useTestLocation();
            return useTodo();
        },
        {
            wrapper: ({ children }) => (
            <BrowserRouter>
                <TodoProvider>{children}</TodoProvider>
            </BrowserRouter>
            ),
        }
        );
    
        const filteredTodos = result.current.filterTodos(
        sampleTodos,
        "/completed" 
        );
    
        const expectedTodos = [sampleTodos[1], sampleTodos[3]];
    
        expect(filteredTodos).toEqual(expectedTodos); 
    });

    it("should return all todos when location.pathname is /", () => {
        const useTestLocation = () => {
        const location = useLocation();
        location.pathname = "/";
        return location;
        };
    
        const { result } = renderHook(
        () => {
            const location = useTestLocation();
            return useTodo();
        },
        {
            wrapper: ({ children }) => (
            <BrowserRouter>
                <TodoProvider>{children}</TodoProvider>
            </BrowserRouter>
            ),
        }
        );
    
        const filteredTodos = result.current.filterTodos(
        sampleTodos,
        "/" 
        );
    
        const expectedTodos = sampleTodos;
    
        expect(filteredTodos).toEqual(expectedTodos); 
    });
});
