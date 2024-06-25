import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../helper/renderWithTheme";
import GlobalProvider from "../../context/GlobalContext";
import { BrowserRouter } from "react-router-dom";
import TodoList from ".";

const mockItemList = [
  { id: "1", title: "Task 1", isDone: false },
  { id: "2", title: "Task 2", isDone: true },
];

jest.mock("../TodoItem", () => ({ task }: { task: any }) => (
  <div data-testid="todo-item">{task.title}</div>
));

describe("TodoList component", () => {
  it("Should render component", () => {
    renderWithTheme(
      <BrowserRouter>
        <GlobalProvider>
          <TodoList ItemList={mockItemList} />
        </GlobalProvider>
      </BrowserRouter>,
    );

    const task1 = screen.getByText(/task 1/i);
    const task2 = screen.getByText(/task 2/i);

    expect(task1).toBeInTheDocument();
    expect(task2).toBeInTheDocument();
  });

  it("Should render todolist eith no items", () => {
    renderWithTheme(
      <BrowserRouter>
        <GlobalProvider>
          <TodoList ItemList={[]} />
        </GlobalProvider>
      </BrowserRouter>,
    );

    const items = screen.queryByRole("listitem");

    expect(items).not.toBeInTheDocument();
  });

  it("Should renders each item inside a list item", () => {
    renderWithTheme(
      <BrowserRouter>
        <GlobalProvider>
          <TodoList ItemList={mockItemList} />
        </GlobalProvider>
      </BrowserRouter>,
    );

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(mockItemList.length);
  });

  it("Should renders TodoList and skips null or undefined items", () => {
    renderWithTheme(
      <BrowserRouter>
        <GlobalProvider>
          <TodoList ItemList={mockItemList.filter(Boolean)} />
        </GlobalProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText("null")).not.toBeInTheDocument();
  });

  it("Should renders passes correct props to TodoItem", () => {
    renderWithTheme(
      <BrowserRouter>
        <GlobalProvider>
          <TodoList ItemList={mockItemList} />
        </GlobalProvider>
      </BrowserRouter>,
    );

    const todoItems = screen.getAllByTestId("todo-item");
    expect(todoItems[0]).toHaveTextContent("Task 1");
    expect(todoItems[1]).toHaveTextContent("Task 2");
  });
});
