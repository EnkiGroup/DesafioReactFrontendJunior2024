import { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useTasksContext } from "../../contexts/tasks-context";

import { TasksInput } from "../../components/tasks-input";

jest.mock("../../contexts/tasks-context", () => ({
  useTasksContext: jest.fn(),
}));

describe("TasksInput", () => {
  const mockAddTask = jest.fn();
  const mockToggleAllTasksCheck = jest.fn();
  const mockContextValue = {
    addTask: mockAddTask,
    tasks: [],
    tasksLeft: 3,
    toggleAllTasksCheck: mockToggleAllTasksCheck
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useTasksContext as jest.Mock).mockReturnValue(mockContextValue);
  });

  it("should render input on focus", () => {
    render(<TasksInput />);

    const input = screen.getByTestId("task-input")
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus()
  })

  it("should call addTask on form submission", async () => {
    render(<TasksInput />);

    const input = screen.getByTestId("task-input");

    await act(async () => {
      fireEvent.change(input, { target: { value: "Lavar a louça" } });
      fireEvent.submit(input);
    });

    expect(mockAddTask).toHaveBeenCalledWith("Lavar a louça");
  });

  it("should not submit form when title length less than 2", async () => {
    render(<TasksInput />);

    const input = screen.getByTestId("task-input");

    await act(async () => {
      fireEvent.change(input, { target: { value: "L" } });
      fireEvent.submit(input);
    });

    expect(mockAddTask).not.toHaveBeenCalled();
  })
})