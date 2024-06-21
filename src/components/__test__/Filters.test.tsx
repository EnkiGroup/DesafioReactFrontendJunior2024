import { render, screen } from "@testing-library/react";
import { Filters } from "../Filters";
import { BrowserRouter } from "react-router-dom";
import todoListJson from "../../../db.json";

describe("Filters", () => {
  it("Should render the correct amount of imcomplete todos", () => {
    render(
      <Filters
        todoList={todoListJson.todos}
        removeAllCompletedTodos={function (): void {}}
      />,
      {
        wrapper: BrowserRouter,
      },
    );
    const paragraph = screen.getByText(/2 items left/i);
    expect(paragraph).toBeInTheDocument();
  });

  it("Should render the right link", () => {
    render(
      <Filters
        removeAllCompletedTodos={function (): void {}}
        todoList={todoListJson.todos}
      />,
      {
        wrapper: BrowserRouter,
      },
    );
    const link = screen.getByText(/All/i);
    expect(link).toHaveAttribute("href", "/");
  });
});
