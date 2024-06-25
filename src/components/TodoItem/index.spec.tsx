import { fireEvent, screen } from "@testing-library/react";
import { renderWithTheme } from "../../helper/renderWithTheme";
import TodoItem from ".";
import GlobalProvider from "../../context/GlobalContext";
import { BrowserRouter } from "react-router-dom";
import toast from "react-hot-toast";

jest.mock("react-hot-toast", () => ({
  ...jest.requireActual("react-hot-toast"),
  toast: {
    error: jest.fn(),
  },
}));

const mockTask = {
  id: "1",
  title: "teste de item",
  isDone: false,
};

describe("Todoitem component", () => {
  it("Should render component", () => {
    renderWithTheme(
      <BrowserRouter>
        <GlobalProvider>
          <TodoItem task={mockTask} />
        </GlobalProvider>
      </BrowserRouter>,
    );

    const todoItem = screen.getByRole("todoItem");

    expect(todoItem).toBeInTheDocument();
  });

  it("Should enabled editing mode on double click", () => {
    renderWithTheme(
      <BrowserRouter>
        <GlobalProvider>
          <TodoItem task={mockTask} />
        </GlobalProvider>
      </BrowserRouter>,
    );

    const todoItem = screen.getByRole("todoItem");

    fireEvent.doubleClick(todoItem);

    const inputEditing = screen.getByRole("inputEditing");

    expect(inputEditing).toBeInTheDocument();
  });

  it("Should change title task", async () => {
    renderWithTheme(
      <BrowserRouter>
        <GlobalProvider>
          <TodoItem task={mockTask} />
        </GlobalProvider>
      </BrowserRouter>,
    );

    const todoItem = screen.getByRole("todoItem");

    fireEvent.doubleClick(todoItem);

    const inputEditing = screen.getByRole("inputEditing");

    fireEvent.change(inputEditing, { target: { value: "New Task Title" } });
    fireEvent.keyPress(inputEditing, { key: "Enter", code: "Enter" });

    const newTask = await screen.findByRole("inputEditing");
    expect(newTask).toHaveAttribute("value", "New Task Title");
  });
});
