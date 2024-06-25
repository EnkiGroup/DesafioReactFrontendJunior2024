import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoHeader } from "./TodoHeader";

describe("TodoHeader", () => {
  const setup = () => {
    const onAddTodo = jest.fn();
    const onToggleAll = jest.fn();
    render(
      <TodoHeader
        onAddTodo={onAddTodo}
        onToggleAll={onToggleAll}
        allCompleted={false}
        hasTodos={true}
      />
    );
    return { onAddTodo, onToggleAll };
  };

  it("should call onAddTodo when enter key is pressed", () => {
    const { onAddTodo } = setup();
    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.keyDown(input, { key: "Enter", target: { value: "New Todo" } });
    expect(onAddTodo).toHaveBeenCalledTimes(1);
  });

  it("should call onToggleAll when toggle all is clicked", () => {
    const { onToggleAll } = setup();
    const toggleAllCheckbox = screen.getByRole("checkbox", {
      name: /toggle all/i,
    });
    fireEvent.click(toggleAllCheckbox);
    expect(onToggleAll).toHaveBeenCalledTimes(1);
  });

  it("should have aria-label for toggle all checkbox", () => {
    setup();
    const toggleAllCheckbox = screen.getByRole("checkbox", {
      name: /toggle all/i,
    });
    expect(toggleAllCheckbox).toBeInTheDocument();
  });
});
