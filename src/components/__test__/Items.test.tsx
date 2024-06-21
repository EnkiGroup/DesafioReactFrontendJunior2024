import { fireEvent, render, screen } from "@testing-library/react";
import { Items } from "../Items";
import { BrowserRouter as Router } from "react-router-dom";
import todoListJson from "../../../db.json";

describe("Todo", () => {
  it("Should show the edit mode when double clicked", async () => {
    render(
      <Items
        removeTodo={function (id: string): void {}}
        toggleTodoStatus={function (id: string): void {}}
        updateTodoTitle={function (id: string, newTitle: string): void {}}
        todo={todoListJson.todos[0]}
      />,
      { wrapper: Router },
    );
    const paragraph = screen.getByText(/Lavar os pratos/i);
    fireEvent.doubleClick(paragraph);
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });
});
