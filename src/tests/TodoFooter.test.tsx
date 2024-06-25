import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TodoFooter from '../components/TodoFooter';

test('renders TodoFooter component', () => {
  const mockHandleClearCompleted = jest.fn();

  // Renderiza TodoFooter dentro de MemoryRouter
  const { getByText } = render(
    <MemoryRouter>
      <TodoFooter
        numberChange={3}
        handleClearCompleted={mockHandleClearCompleted}
      />
    </MemoryRouter>
  );

  const todoCountElement = getByText(/3 items left!/i);
  const clearButton = getByText(/Clear completed/i);

  expect(todoCountElement).toBeInTheDocument();
  expect(clearButton).toBeInTheDocument();
});