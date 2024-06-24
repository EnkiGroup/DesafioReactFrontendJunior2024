import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../components/Form';
import Todo from '../interfaces/Todo';

const mockTodos: Todo[] = [
  { id: 1, title: 'Lavar os pratos', isDone: false },
  { id: 2, title: 'Cortar a grama', isDone: true },
  { id: 3, title: 'Comprar pão', isDone: false }
];

describe('Form', () => {
  test('adiciona um novo todo quando o formulário é enviado', async () => {
    const mockAddTodo = jest.fn();

    render(<Form todos={mockTodos} addTodo={mockAddTodo} finishAllTodos={() => {}} />);

    const inputElement = screen.getByPlaceholderText('What needs to be done?');
    const formElement = screen.getByTestId('todo-form');

    await act(async () => {
      await userEvent.type(inputElement, 'Novo Todo');
      await fireEvent.submit(formElement);
    });

    // Ajuste para verificar o ID correto do novo todo
    expect(mockAddTodo).toHaveBeenCalledWith({ title: 'Novo Todo', id: 4, isDone: false });
  });
});
