import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useTasksContext } from "../../contexts/tasks-context";
import { ReadableTaskItem } from "../../components/readable-task-item";

import { Task } from "../../types";

jest.mock("../../contexts/tasks-context", () => ({
  useTasksContext: jest.fn(),
}));

describe("ReadableTaskItem", () => {
  const task: Task = {
    "id": "flrGI",
    "title": "Lavar os pratos",
    "isDone": false
  }
  const mockToggleTaskCheck = jest.fn(() => task.isDone = !task.isDone);
  const mockRemoveTask = jest.fn();
  const mockContextValue = {
    toggleTaskCheck: mockToggleTaskCheck,
    removeTask: mockRemoveTask
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useTasksContext as jest.Mock).mockReturnValue(mockContextValue);
  });

  it("should initially render with correct styles", () => {
    render(<ReadableTaskItem task={task} />)

    const readableTask = screen.getByText("Lavar os pratos")
    expect(readableTask).toBeInTheDocument()
    expect(readableTask).not.toHaveClass("text-gray-400 line-through")

    const checkIcon = screen.queryByTestId("check-icon");
    expect(checkIcon).not.toBeInTheDocument();

    const checkBorder = screen.getByTestId("check-border");
    expect(checkBorder).toHaveStyle("border-color: rgb(156 163 175)");
  })

  it("should render with correct styles when the task is done", () => {
    const taskCompleted: Task = {
      "id": "flrGI",
      "title": "Lavar os pratos",
      "isDone": true
    }

    render(<ReadableTaskItem task={taskCompleted} />)

    const task = screen.getByText("Lavar os pratos")
    expect(task).toBeInTheDocument()
    expect(task).toHaveClass("text-gray-400 line-through")

    const checkIcon = screen.queryByTestId("check-icon");
    expect(checkIcon).toBeInTheDocument();

    const checkBorder = screen.getByTestId("check-border");
    expect(checkBorder).toHaveStyle("border-color: rgb(22 163 74)");
  })

  it("should switch styles correctly when CheckButton is clicked", () => {
    const { rerender } = render(<ReadableTaskItem task={task} />)

    const taskBefore = screen.getByText("Lavar os pratos")
    expect(taskBefore).not.toHaveClass("text-gray-400 line-through")

    const checkIconBefore = screen.queryByTestId("check-icon");
    expect(checkIconBefore).not.toBeInTheDocument();

    const checkBorderBefore = screen.getByTestId("check-border");
    expect(checkBorderBefore).toHaveStyle("border-color: rgb(156 163 175)");

    const checkButton = screen.getByRole("checkbox")
    fireEvent.click(checkButton)

    rerender(<ReadableTaskItem task={task} />)

    const taskAfter = screen.getByText("Lavar os pratos")
    expect(taskAfter).toHaveClass("text-gray-400 line-through")

    const checkIconAfter = screen.queryByTestId("check-icon");
    expect(checkIconAfter).toBeInTheDocument()

    const checkBorderAfter = screen.getByTestId("check-border");
    expect(checkBorderAfter).toHaveStyle("border-color: rgb(22 163 74)");
  })

  it("should call toggleTaskCheck with correct params when CheckButton is clicked", () => {
    render(<ReadableTaskItem task={task} />);

    const checkButton = screen.getByRole("checkbox");
    fireEvent.click(checkButton);

    expect(mockToggleTaskCheck).toHaveBeenCalledWith(task.id);
  });

  it("should call removeTask when remove button is clicked", () => {
    render(<ReadableTaskItem task={task} />);

    const removeButton = screen.getByTestId("remove-button");
    fireEvent.click(removeButton);

    expect(mockRemoveTask).toHaveBeenCalledWith(task.id);
  });
})