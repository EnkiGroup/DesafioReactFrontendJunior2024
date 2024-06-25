import { render } from '@testing-library/react';
import TodoItem from '../components/TodoItem';

const mockTodo = {
  id: 'uuid1',
  title: 'Test todo',
  isDone: false,
  editing: false
};

test('renders TodoItem component', () => {
  const mockSetTodos = jest.fn();
  const mockHandleSaveEdit = jest.fn();

  const { getByText } = render(
    <TodoItem
      todo={mockTodo}
      todos={[mockTodo]}
      setTodos={mockSetTodos}
      handleSaveEdit={mockHandleSaveEdit}
    />
  );

  const todoElement = getByText(/Test todo/i);
  expect(todoElement).toBeInTheDocument();
});