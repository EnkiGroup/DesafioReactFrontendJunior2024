import { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useTasksContext } from "../../contexts/tasks-context";

import { EditableTaskItem } from "../../components/editable-task-item";

jest.mock("../../contexts/tasks-context", () => ({
  useTasksContext: jest.fn(),
}));

describe("EditableTaskItem", () => {
  const task = {
    "id": "flrGI",
    "title": "Lavar os pratos",
    "isDone": false
  }
  const mockExitEditableMode = jest.fn();
  const mockUpdateTaskTitle = jest.fn();
  const mockContextValue = {
    updateTaskTitle: mockUpdateTaskTitle,
  };
  
  beforeEach(() => {
    jest.clearAllMocks();

    (useTasksContext as jest.Mock).mockReturnValue(mockContextValue);
  });

  it("should render input with the task title", () => {    
    render(<EditableTaskItem task={task} exitEditableMode={mockExitEditableMode} />);

    const input = screen.getByTestId("editable-task-input")
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(task.title)
  })

  it("should render input on focus", () => {    
    render(<EditableTaskItem task={task} exitEditableMode={mockExitEditableMode} />);

    const input = screen.getByTestId("editable-task-input")
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus()
  })

  it("should call exitEditableMode on blur", () => {   
    render(<EditableTaskItem task={task} exitEditableMode={mockExitEditableMode} />);

    const input = screen.getByTestId("editable-task-input")
    fireEvent.blur(input)

    expect(mockExitEditableMode).toHaveBeenCalled()
  })

  it("should call updateTaskTitle and exitEditableMode on form submission", async () => {
    render(<EditableTaskItem task={task} exitEditableMode={mockExitEditableMode} />);

    const input = screen.getByTestId("editable-task-input");

    await act(async () => {
      fireEvent.change(input, { target: { value: "Lavar a louça" } });
      fireEvent.submit(input);
    });

    expect(mockUpdateTaskTitle).toHaveBeenCalledWith({
      id: task.id,
      title: "Lavar a louça"
    });
    expect(mockExitEditableMode).toHaveBeenCalled()
  });
})