import { render, screen } from "@testing-library/react";
import { All } from "../All";

import todoListJson from "../../../db.json";
import { BrowserRouter } from "react-router-dom";

describe("All", () => {
  it("Should appear the right amount of todos in the document", () => {
    render(
      <All
        removeTodo={function (id: string): void {}}
        toggleTodoStatus={function (id: string): void {}}
        updateTodoTitle={function (id: string, newTitle: string): void {}}
        removeAllCompletedTodos={function (): void {}}
        todoList={todoListJson.todos}
      />,
      { wrapper: BrowserRouter },
    );

    const li = screen.getAllByRole("listitem");
    expect(li.length).toBe(3);
  });

  it("Should render the filter component", () => {
    render(
      <All
        removeTodo={function (id: string): void {}}
        toggleTodoStatus={function (id: string): void {}}
        updateTodoTitle={function (id: string, newTitle: string): void {}}
        removeAllCompletedTodos={function (): void {}}
        todoList={todoListJson.todos}
      />,
      { wrapper: BrowserRouter },
    );

    const filterComponent = screen.getByTestId("filter");
    expect(filterComponent).toBeInTheDocument();
  });
});
