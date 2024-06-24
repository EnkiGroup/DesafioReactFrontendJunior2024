// src/test/testeFilters.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import AllTodos from '../routes/AllTodos';
import ActiveTodos from '../routes/ActiveTodos';
import CompletedTodos from '../routes/CompletedTodos';

const mockTodos = [
  { id: 1, title: 'Lavar os pratos', isDone: false },
  { id: 2, title: 'Cortar a grama', isDone: true },
  { id: 3, title: 'Comprar pão', isDone: false }
];

describe('AllTodos', () => {
  test('renders all todos', () => {
    render(<AllTodos todos={mockTodos} deleteTodo={() => {}} updateTodo={() => {}} />);

    const todo1 = screen.getByText(/Lavar os pratos/i);
    const todo2 = screen.getByText(/Cortar a grama/i);
    const todo3 = screen.getByText(/Comprar pão/i);

    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeInTheDocument();
    expect(todo3).toBeInTheDocument();
  });
});

describe('ActiveTodos', () => {
  test('renders only active todos', () => {
    render(<ActiveTodos todos={mockTodos} deleteTodo={() => {}} updateTodo={() => {}} />);

    const todo1 = screen.getByText(/Lavar os pratos/i);
    const todo3 = screen.getByText(/Comprar pão/i);

    expect(todo1).toBeInTheDocument();
    expect(todo3).toBeInTheDocument();
    expect(screen.queryByText(/Cortar a grama/i)).not.toBeInTheDocument(); // Verifica se o Cortar a grama não está renderizado
  });
});

describe('CompletedTodos', () => {
  test('renders only completed todos', () => {
    render(<CompletedTodos todos={mockTodos} deleteTodo={() => {}} updateTodo={() => {}} />);

    const todo2 = screen.getByText(/Cortar a grama/i);

    expect(todo2).toBeInTheDocument();
    expect(screen.queryByText(/Lavar os pratos/i)).not.toBeInTheDocument(); // Verifica se o Lavar os pratos não está renderizado
    expect(screen.queryByText(/Comprar pão/i)).not.toBeInTheDocument(); // Verifica se o Comprar pão não está renderizado
  });
});
