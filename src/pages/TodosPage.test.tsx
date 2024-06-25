import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodosPage from "./TodosPage";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";

jest.mock("../hooks/useTodos");

const mockUseTodos = useTodos as jest.MockedFunction<typeof useTodos>;

describe("TodosPage", () => {
  beforeEach(() => {
    mockUseTodos.mockReturnValue({
      todos: [
        { id: "1", title: "Test Todo 1", isDone: false },
        { id: "2", title: "Test Todo 2", isDone: true },
      ],
      handleAddTodo: jest.fn(),
      handleRemoveTodo: jest.fn(),
      handleToggleTodo: jest.fn(),
      handleToggleAll: jest.fn(),
      handleClearCompleted: jest.fn(),
    });
  });

  const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
    const router = createMemoryRouter([{ path: route, element: ui }], {
      initialEntries: [route],
    });
    return render(<RouterProvider router={router} />);
  };

  it("should render the title", () => {
    renderWithRouter(<TodosPage />);
    expect(screen.getByText("Todos")).toBeInTheDocument();
  });

  it("should add a todo when enter key is pressed", () => {
    renderWithRouter(<TodosPage />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.keyDown(input, { key: "Enter", target: { value: "New Todo" } });
    expect(mockUseTodos().handleAddTodo).toHaveBeenCalledTimes(1);
  });

  it("should toggle all todos when toggle all is clicked", () => {
    renderWithRouter(<TodosPage />);
    const toggleAllCheckbox = screen.getByRole("checkbox", {
      name: /toggle all/i,
    });
    fireEvent.click(toggleAllCheckbox);
    expect(mockUseTodos().handleToggleAll).toHaveBeenCalledTimes(1);
  });

  it("should clear completed todos when clear completed is clicked", () => {
    renderWithRouter(<TodosPage />);
    fireEvent.click(screen.getByText("Clear completed"));
    expect(mockUseTodos().handleClearCompleted).toHaveBeenCalledTimes(1);
  });
});
