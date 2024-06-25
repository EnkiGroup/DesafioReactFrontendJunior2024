import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useTasksContext } from "../../contexts/tasks-context";

import { MemoryRouter } from "react-router-dom";

import { TasksFooter } from "../../components/tasks-footer";

jest.mock("../../contexts/tasks-context", () => ({
  useTasksContext: jest.fn(),
}));

function renderComponent() {
  render(
    <MemoryRouter>
      <TasksFooter />
    </MemoryRouter>
  );
}

describe("TasksFooter", () => {
  const mockClearCompletedTasks = jest.fn();
  const mockContextValue = {
    isTasksListEmpty: false,
    tasksLeft: 3,
    clearCompletedTasks: mockClearCompletedTasks,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useTasksContext as jest.Mock).mockReturnValue(mockContextValue);
  });

  it("should render itens left correctly", () => {
    renderComponent()

    const tasksLeft = screen.getByTestId("tasks-left");
    expect(tasksLeft).toHaveTextContent("3")
  })

  it("should render filter buttons correctly", () => {
    renderComponent()

    const allFilterButton = screen.getByText("All");
    const activeFilterButton = screen.getByText("Active");
    const completedFilterButton = screen.getByText("Completed");

    expect(allFilterButton).toBeInTheDocument();
    expect(activeFilterButton).toBeInTheDocument();
    expect(completedFilterButton).toBeInTheDocument();
  });

  it("should render clear completed button correctly", () => {
    renderComponent()

    const clearButton = screen.getByText("Clear completed");
    expect(clearButton).toBeInTheDocument();
  });

  it("should call clearCompletedTasks when (Clear completed) button is clicked", () => {
    renderComponent()

    const clearButton = screen.getByText("Clear completed");
    fireEvent.click(clearButton);

    expect(mockClearCompletedTasks).toHaveBeenCalled();
  });

  it("should not render footer when isTasksListEmpty is true", () => {
    (useTasksContext as jest.Mock).mockReturnValueOnce({
      isTasksListEmpty: true,
      tasksLeft: 0,
      clearCompletedTasks: mockClearCompletedTasks,
    });

    renderComponent()

    const footerElement = screen.queryByRole("footer");
    expect(footerElement).not.toBeInTheDocument();
  });
})
