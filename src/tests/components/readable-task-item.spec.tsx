import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useTasksContext } from '../../contexts/tasks-context';
import { ReadableTaskItem } from '../../components/readable-task-item';

jest.mock('../../contexts/tasks-context', () => ({
  useTasksContext: jest.fn(),
}));

describe("ReadableTaskItem", () => {

  const task = {
    "id": "flrGI",
    "title": "Lavar os pratos",
    "isDone": false
  }
  const mockToggleTaskCheck = jest.fn();
  const mockRemoveTask = jest.fn();
  const mockContextValue = {
    toggleTaskCheck: mockToggleTaskCheck,
    removeTask: mockRemoveTask
  };

  (useTasksContext as jest.Mock).mockReturnValue(mockContextValue);

  it("should initially render with correct styles", () => {
    render(<ReadableTaskItem task={task} />)

    const readableTaskItem = screen.getByText("Lavar os pratos")
    expect(readableTaskItem).toBeInTheDocument()
    expect(readableTaskItem).not.toHaveClass("text-gray-400 line-through")

    const checkIcon = screen.queryByTestId('check-icon');
    expect(checkIcon).not.toBeInTheDocument();

    const checkBorder = screen.getByTestId('check-border');
    expect(checkBorder).toHaveStyle('border-color: rgb(156 163 175)');
  })

  it("should render with correct styles when the task is done", () => {
    const taskCompleted = {
      "id": "flrGI",
      "title": "Lavar os pratos",
      "isDone": true
    }

    render(<ReadableTaskItem task={taskCompleted} />)

    const readableTaskItem = screen.getByText("Lavar os pratos")
    expect(readableTaskItem).toBeInTheDocument()
    expect(readableTaskItem).toHaveClass("text-gray-400 line-through")

    const checkIcon = screen.queryByTestId('check-icon');
    expect(checkIcon).toBeInTheDocument();

    const checkBorder = screen.getByTestId('check-border');
    expect(checkBorder).toHaveStyle('border-color: rgb(22 163 74)');
  })

  it('should toggle task check when CheckButton is clicked', () => {
    render(<ReadableTaskItem task={task} />);

    const checkButton = screen.getByRole('checkbox');
    fireEvent.click(checkButton);

    expect(mockToggleTaskCheck).toHaveBeenCalledWith(task.id);
  });

  it('should remove task when remove icon is clicked', () => {
    render(<ReadableTaskItem task={task} />);

    const removeIcon = screen.getByTestId('remove-icon');
    fireEvent.click(removeIcon);

    expect(mockRemoveTask).toHaveBeenCalledWith(task.id);
  });
})