import { render } from '@testing-library/react';
import TodoList from '../components/TodoList';

const mockTodos = [
  {
    id: 'uuid1',
    title: 'Test todo 1',
    isDone: false,
    editing: false
  },
  {
    id: 'uuid2',
    title: 'Test todo 2',
    isDone: true,
    editing: false
  }
];

test('renders TodoList component', () => {
  const mockSetTodos = jest.fn();
  const mockHandleSaveEdit = jest.fn();

  const { getByText } = render(
    <TodoList
      todos={mockTodos}
      setTodos={mockSetTodos}
      handleSaveEdit={mockHandleSaveEdit}
    />
  );

  const todo1 = getByText(/Test todo 1/i);
  const todo2 = getByText(/Test todo 2/i);
  expect(todo1).toBeInTheDocument();
  expect(todo2).toBeInTheDocument();
});