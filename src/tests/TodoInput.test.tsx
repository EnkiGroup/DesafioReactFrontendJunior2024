import { render, fireEvent } from '@testing-library/react';
import TodoInput from '../components/TodoInput';

test('renders TodoInput component', () => {
  const handleChange = jest.fn();
  const handleKeyPress = jest.fn();

  const { getByPlaceholderText } = render(
    <TodoInput
      value=""
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );

  const inputElement = getByPlaceholderText(/What needs to be done?/i);
  expect(inputElement).toBeInTheDocument();
});

test('calls onChange when input value changes', () => {
  const handleChange = jest.fn();
  const handleKeyPress = jest.fn();

  const { getByPlaceholderText } = render(
    <TodoInput
      value=""
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );

  const inputElement = getByPlaceholderText(/What needs to be done?/i);
  fireEvent.change(inputElement, { target: { value: 'New task' } });

  expect(handleChange).toHaveBeenCalledTimes(1);
});