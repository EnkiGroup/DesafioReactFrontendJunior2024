import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "./TodoList";

const mockTodos = [
  { id: "1", title: "Test Todo 1", isDone: false },
  { id: "2", title: "Test Todo 2", isDone: true },
];

describe("TodoList", () => {
  const setup = () => {
    const onToggleTodo = jest.fn();
    const onRemoveTodo = jest.fn();
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={onToggleTodo}
        onRemoveTodo={onRemoveTodo}
      />
    );
    return { onToggleTodo, onRemoveTodo };
  };

  it("should render todo items", () => {
    setup();
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("should call onToggleTodo when todo is toggled", () => {
    const { onToggleTodo } = setup();
    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(onToggleTodo).toHaveBeenCalledTimes(1);
  });

  it("should call onRemoveTodo when remove button is clicked", () => {
    const { onRemoveTodo } = setup();
    const removeButton = screen.getByTestId("remove-button-1");
    fireEvent.click(removeButton);
    expect(onRemoveTodo).toHaveBeenCalledTimes(1);
  });
});
