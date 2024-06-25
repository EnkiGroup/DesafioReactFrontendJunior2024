import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Todo from "./todo";

describe('Todo Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <Todo filter='all' />
      </MemoryRouter>
    );
    expect(getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
  });

  it('can add a new todo', () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <Todo filter="all" />
      </MemoryRouter>
    );

    const input = getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(getByText('New Todo')).toBeInTheDocument();
  });

  it('can toggle todo completion', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <MemoryRouter>
        <Todo filter="all" />
      </MemoryRouter>
    );

    const input = getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('can delete a todo', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <MemoryRouter>
        <Todo filter="all" />
      </MemoryRouter>
    );

    const input = getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // Busca pelo botão de deletar usando uma função para combinar texto parcial
    const deleteButton = getByText((content, element) => 
      element.tagName.toLowerCase() === 'button' && element.textContent.includes('✕')
    );
    fireEvent.click(deleteButton);

    expect(queryByText('New Todo')).toBeNull();
  });

  it('can filter active todos', () => {
    const { getByPlaceholderText, getByText, getAllByRole } = render(
      <MemoryRouter>
        <Todo filter="all" />
      </MemoryRouter>
    );

    const input = getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Active Todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    fireEvent.change(input, { target: { value: 'Completed Todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const checkboxes = getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);

    fireEvent.click(getByText('Active'));
    expect(getByText('Active Todo')).toBeInTheDocument();
    expect(() => getByText('Completed Todo')).toThrow();
  });

  it('clears completed todos', () => {
    const { getByPlaceholderText, getByText, getAllByRole, queryByText } = render(
      <MemoryRouter>
        <Todo filter="all" />
      </MemoryRouter>
    );

    const input = getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Active Todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    fireEvent.change(input, { target: { value: 'Completed Todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const checkboxes = getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);

    fireEvent.click(getByText('Clear completed'));
    expect(getByText('Active Todo')).toBeInTheDocument();
    expect(queryByText('Completed Todo')).toBeNull();
  });
});
